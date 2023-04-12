// import dbConnect from "../../../_unsorted/database/dbConnect";
// import { Post } from "../../../_unsorted/database/schemas";
// import { pwd } from "../../../_unsorted/util/utils";
// import { Tweet } from "../../../_unsorted/database/schemas";
// import { User } from "../../../_unsorted/database/schemas";

// export default async function handler(req, res) {
//   const { method } = req;

//   await dbConnect();

//   // api/users
//   switch (method) {
//     case "GET":
//       let value;
//       const username = req.query.q;
//       const postId = req.query.postId;
//       try {
//         value = await User.findOne({
//           username: username,
//           likes: { $elemMatch: { $eq: postId } },
//         });
//         if (value) {
//           res.status(200).json({ success: true, liked_by: true });
//         } else {
//           res.status(200).json({ success: true, liked_by: false });
//         }
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     default:
//       res.status(400).json({ success: false, data: "Invalid request!" });
//       break;
//   }
// }
