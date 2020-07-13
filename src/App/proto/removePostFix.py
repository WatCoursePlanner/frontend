FileName = 'courses_pb.d.ts'

with open(FileName) as f:
    newText=f.read() \
    .replace('List(', '(') \
    .replace('List:', ':') \
    .replace('Map(', '(') \
    .replace('Map:', ':')

with open(FileName, "w") as f:
    f.write(newText)
