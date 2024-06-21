import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "./config/adminGrpc.proto";
const PROTO_PATH_USER = "./config/userGrpc.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const userPacket = protoLoader.loadSync(PROTO_PATH_USER, options);

const { AdminService } = grpc.loadPackageDefinition(packageDefinition);

const { UserService } = grpc.loadPackageDefinition(userPacket);

const grpcClientAdmin = new AdminService(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

const grpcClientUser = new UserService(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

export { grpcClientAdmin, grpcClientUser };
