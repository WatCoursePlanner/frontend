protoc \
  --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
  --ts_proto_out="./src/App/proto" \
  --proto_path="./proto" \
  ./proto/*.proto
