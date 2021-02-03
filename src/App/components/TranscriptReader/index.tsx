import { Icon } from "@material-ui/core";
import { CoopStream, CreateStudentProfileRequest } from "@watcourses/proto/courses";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
// @ts-ignore
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.min';
import type { PDFDocumentProxy, TextContent, TextItem } from 'pdfjs-dist/types/display/api'
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

/**
 * Retrieves the text of a specif page within a PDF Document obtained through pdf.js
 *
 * @param {number} pageNum Specifies the number of the page
 * @param {PDFDocumentProxy} PDFDocumentInstance The PDF document obtained
 */
const getPageText = (pageNum: number, PDFDocumentInstance: PDFDocumentProxy) => new Promise<string>(resolve => {
  PDFDocumentInstance.getPage(pageNum).then(pdfPage => {
    pdfPage.getTextContent().then((textContent: TextContent) => {
      resolve(textContent.items.map((it: TextItem) => it.str).join(" "));
    });
  });
});

const StyledDropzoneContainer = styled.div`
  section {
    border: #777;
    border-width: 2px;
    border-style: dashed;
    text-align: center;
    width: 500px;
    height: 200px;
    padding-top: 100px;
  }
`;

type TranscriptReaderProps = {
  onSuccessCallback: (request: CreateStudentProfileRequest) => void,
}

const TranscriptReader = ({onSuccessCallback}: TranscriptReaderProps) => {
  let onDrop: (acceptedFiles: any) => void;
  onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        GlobalWorkerOptions.workerSrc = PDFJSWorker;
        const binaryStr = new Uint8Array(reader.result as ArrayBuffer);
        getDocument(binaryStr).promise.then(pdfDocument => {
          getPageText(1, pdfDocument).then((text: string) => {
            const regexBasicInfo = new RegExp(/Record *(.+? [0-9]+?) Program: *(.*?) *Level/g);
            const regexCourses = new RegExp(/[A-Z]+ +[0-9][0-9A-Z]+/g);
            const regexLevels = new RegExp(/Level: *([0-9][A-B])/g);

            const info = Array.from(text.matchAll(regexBasicInfo))[0];
            const startingYear = +info[1].toString().split(" ")[1];
            const program = info[2];
            const courses: { [key: number]: string } = {}; // index: courseCode / index: Level (e.g. 1A)
            const idxs: number[] = []; // the indices of level info

            for (const match of text.matchAll(regexCourses)) {
              if (match[0].includes("GPA")) {
                continue;
              }
              courses[match.index as number] = match[0].replace("   ", " ");
            }

            for (const match of text.matchAll(regexLevels)) {
              const index = match.index as number;
              courses[index] = match[1];
              idxs.push(index);
            }

            let j = 0;
            const coursesByTerm: { [key: string]: string[] } = {};
            const keys = Object.keys(courses).map(i => +i);
            for (const i of idxs) {
              const index = idxs[+i];
              const nextIndex = idxs[+i + 1] ?? keys.slice(-1).pop();
              const term = courses[index];
              // process the current term
              while (keys[j] < nextIndex) {
                if (!coursesByTerm[term]) {
                  coursesByTerm[term] = [];
                }
                j++;
                // reach a new term
                if (keys[j] === nextIndex) {
                  break;
                }
                coursesByTerm[term].push(courses[keys[j]]);
              }
            }
            const schedule = [];
            for (const term in coursesByTerm) {
              if (coursesByTerm.hasOwnProperty(term)) {
                schedule.push({termName: term, courseCodes: coursesByTerm[term]});
              }
            }
            const result = CreateStudentProfileRequest.fromJSON({
              degrees: [program],
              startingYear,
              coopStream: CoopStream.STREAM_8,
              schedule: {
                terms: schedule
              }
            });
            onSuccessCallback(result);
          });

        }, function (reason: string) {
          console.error(reason);
        });
      };
      reader.readAsArrayBuffer(file);
    });

  }, []);

  return (
    <StyledDropzoneContainer>
      <Dropzone onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop your transcript here</p>
              <Icon>file_copy</Icon>
            </div>
          </section>
        )}
      </Dropzone>
    </StyledDropzoneContainer>
  );
};

export default TranscriptReader;
