import { randomBytes, createCipheriv } from "crypto";
import generateApiKey from "generate-api-key";

const generateToken = () =>{
    var token = generateApiKey();
    return String(token)   
}


const hashToken = (token)=>{
    const algorithm = "aes-256-cbc"; 
    // generate 16 bytes of random data
    const initVector = process.env.INIT_VECTOR;
    // protected data
    const message = token;
    const Securitykey = process.env.DEVELOPER_SECRET //|| 'a54762edb437be644d699ff7c5d6235c'
    // the cipher function
    const cipher = createCipheriv(algorithm, Securitykey, initVector);
    // encrypt the message
    // input encoding
    // output encoding
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData
}

export {generateToken, hashToken}