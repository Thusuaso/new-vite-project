// import AWS from "aws-sdk"

// const spaceEndPoint = new AWS.Endpoint("https://fra1.digitaloceanspaces.com");

// const s3 = new AWS.S3({
//   endpoint: spaceEndPoint,
//   accessKeyId: "B7POIPPYM44Y374P23KS",
//   secretAccessKey: "01CMWBcNKtFgKG6XhP+q0PlajTb2yvELaJ1igo7xsyA",
// });

// export const digitalOceanService = {
//   usaSendPhoto(file:any) {
//     const filename = file.name;
//     const params = {
//       Bucket: "mekmar-image",
//       Key: "usa-products/" + filename,
//       Body: file,
//       ACL: "public-read",
//       ContentType: "image/" + filename.split(".")[1],
//       CacheControl: "public,max-age=1,s-max-age=500,must-revalidate",
//     };

//     s3.upload(params, (err:any, data:any) => {
//       if (err) console.log("AWS HATA : ", err);
//       else console.log("OK : ", data);
//     });
//   },
// };

// import { PutObjectCommand, S3Client   } from "@aws-sdk/client-s3";
// const client = new S3Client  ({
//     endpoint: 'https://fra1.digitaloceanspaces.com',
//     region: 'us-west-2',
//     credentials:{
//         accessKeyId:'B7POIPPYM44Y374P23KS',
//         secretAccessKey:'01CMWBcNKtFgKG6XhP'
//     }
// });

// export const digitalOceanService = {
//     usaSendPhoto(file: any) {
//         const fileName = file.name;
//         const command = new PutObjectCommand({
//                 Bucket: "mekmar-image",
//                 Key: "usa-products/" + fileName,
//                 Body: file,
//                 ACL: "public-read",
//                 CacheControl: "public,max-age=1,s-max-age=500,must-revalidate",
                
//             });

//             try {
//                 const response = client.send(command);
//                 console.log(response);
//             } catch (err) {
//                 console.error(err);
//             }
//     }
// };

import AWS from "aws-sdk";


const spaceEndPoint = new AWS.Endpoint("https://fra1.digitaloceanspaces.com");

const s3 = new AWS.S3({
  endpoint: spaceEndPoint,
  accessKeyId: "B7POIPPYM44Y374P23KS",
  secretAccessKey: "01CMWBcNKtFgKG6XhP+q0PlajTb2yvELaJ1igo7xsyA",
});

const digitalOceanService = {
  galleriaFotoGonder(file:any) {
    const filename = file.name;
    const params = {
      Bucket: "mekmar-image",
      Key: "galleria-project_photos/" + filename,
      Body: file,
      ACL: "public-read",
      ContentType: "image/" + filename.split(".")[1],
      CacheControl: "public,max-age=1,s-max-age=500,must-revalidate",
    };

    s3.upload(params, (err:any, data:any) => {
      if (err) console.log("AWS HATA : ", err);
      else console.log("OK : ", data);
    });
  },
  fotoGonder(file:any) {
    const filename = file.name;
    const params = {
      Bucket: "mekmar-image",
      Key: "products/" + filename,
      Body: file,
      ACL: "public-read",
      ContentType: "image/" + filename.split(".")[1],
      CacheControl: "public,max-age=1,s-max-age=500,must-revalidate",
    };

    s3.upload(params, (err:any, data:any) => {
      if (err) console.log("AWS HATA : ", err);
      else console.log("OK : ", data);
    });
  },

  projeFotoGonder(file: any) {
    const filename = file.name;
    const params = {
      Bucket: "mekmar-image",
      Key: "galleria-project_photos/" + filename,
      Body: file,
      ACL: "public-read",
      ContentType: "image/" + filename.split(".")[1],
      CacheControl: "public,max-age=1,s-max-age=500,must-revalidate"
    };
    return s3.upload(params, (err: any, data: any) => {
      if (err) {
        console.log("AWS HATA : ", err);
        return false;
      }
      else {
        console.log("OK : ", data);
        return true;
      }
    });
  },
  projeDetayFotoGonder(file: any) {
    const filename = file.name;
    const params = {
      Bucket: "mekmar-image",
      Key: "galleria-project_photos/photos/" + filename,
      Body: file,
      ACL: "public-read",
      ContentType: "image/" + filename.split(".")[1],
      CacheControl: "public,max-age=1,s-max-age=500,must-revalidate"
    };
    return s3.upload(params, (err: any, data: any) => {
      if (err) {
        console.log("AWS HATA : ", err);
        return false;
      }
      else {
        console.log("OK : ", data);
        return true;
      }
    });
  }

};

export default digitalOceanService;


// import AWS3 from '@aws-sdk/client-s3';
// const region = "fra1";
// const endPoint = "https://fra1.digitaloceanspaces.com";
// const accessKeyId = "B7POIPPYM44Y374P23KS";
// const secretAccessKey =  "01CMWBcNKtFgKG6XhP+q0PlajTb2yvELaJ1igo7xsyA";
// AWS3.config.update({ region:region, endPoint:endPoint, credentials: { accessKeyId: accessKeyId, secretAccessKey: secretAccessKey } });

// const s3 = AWS3.S3Client({credentials:{accessKeyId,secretAccessKey}})

// const digitalOceanService = {
//   projeFotoGonder(file: any) {
//     const filename = file.name;
//     const params = {
//       Bucket: "mekmar-image",
//       Key: "galleria-project_photos/" + filename,
//       Body: file,
//       ACL: "public-read",
//       ContentType: "image/" + filename.split(".")[1],
//       CacheControl: "public,max-age=1,s-max-age=500,must-revalidate"
//     };
//     const command = new AbortMultipartUploadCommand(params);
//     s3.send(command);
//   },
// }

// export default digitalOceanService;





