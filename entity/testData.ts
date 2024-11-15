// import { Tables } from "./database.types";

// export const userList: Tables<"profiles">[] = [
//   {
//     id: "95f525d1-6c8f-42c3-93b5-423bbc21f792",
//     name: "super niggar",
//     bio: "Civitas timidus saepe talio comburo doloremque aurum tersus nobis triumphus. Damno unus ulciscor viriliter contigo corporis. Totam cultura somnus curriculum correptius excepturi ago delectatio acceptus appositus.",
//     avt: "/duytung-avt.jpg",
//   },
//   {
//     id: "340dbc2e-a3c3-4e1b-aed0-02b406a77b6e",
//     name: "suppellex ipsa cras",
//     bio: "Totidem color degenero asperiores. Cohaero uterque laudantium bibo adfectus calco doloribus vulgaris fugiat solus. Consequuntur clementia amicitia amoveo.",
//     avt: "/hatuananh-avt.jpg",
//   },
//   {
//     id: "bc348cdc-9e74-4988-afdb-49888c8fd4e0",
//     name: "suppellex ipsa cras",
//     bio: "Totidem color degenero asperiores. Cohaero uterque laudantium bibo adfectus calco doloribus vulgaris fugiat solus. Consequuntur clementia amicitia amoveo.",
//     avt: "/toanvu-avt.jpg",
//   },
//   {
//     id: "62c3a1d4-8bab-47de-ab1f-41a66e1702e0",
//     name: "suppellex ipsa cras",
//     bio: "Totidem color degenero asperiores. Cohaero uterque laudantium bibo adfectus calco doloribus vulgaris fugiat solus. Consequuntur clementia amicitia amoveo.",
//     avt: "/trungtin-avt.jpg",
//   },
// ];

// export const taskList: Tables<"tasks">[] = [
//   {
//     id: -1574180827,
//     created_at: "2024-10-13T03:29:27.788Z",
//     title: "cavus decumbo voluntarius",
//     description:
//       "Adimpleo bis antiquus timidus traho demulceo spectaculum. Quibusdam sono eos blandior aegrotatio adulatio cubitum vesica. Talio tener uberrime tersus.",
//     due_date: "2024-10-15T04:19:39.479Z",
//     status: "To_do",
//     priority: "Low",
//   },
//   {
//     id: -2102464344,
//     created_at: "2024-10-13T10:04:26.669Z",
//     title: "laudantium veniam capto",
//     description:
//       "Placeat administratio degero. Supra et desino. Demum supellex aegrus ut cubo.",
//     due_date: "2024-10-13T00:01:05.408Z",
//     status: "To_do",
//     priority: "High",
//   },
//   {
//     id: 154378692,
//     created_at: "2024-10-13T08:08:54.558Z",
//     title: "aranea libero adamo",
//     description:
//       "Venia theatrum vorax rem capitulus sperno celer conturbo brevis cenaculum. Animi absorbeo consectetur civis debitis conduco. Pauci utor magnam libero alioqui vesper.",
//     due_date: "2024-10-12T14:20:29.348Z",
//     status: "In_Progress",
//     priority: "Medium",
//   },
//   {
//     id: -1244489803,
//     created_at: "2024-10-13T01:04:01.922Z",
//     title: "vito cursim aspicio",
//     description:
//       "Canis illo cunae basium dedico. Vilicus supplanto venustas supra campana tergo. Caste abscido natus sollicito denique.",
//     due_date: "2024-10-13T06:08:00.197Z",
//     status: "In_Progress",
//     priority: "Medium",
//   },
//   // {
//   //   id: 697355865,
//   //   created_at: "2024-10-13T06:25:27.417Z",
//   //   title: "quaerat somniculosus strues",
//   //   description:
//   //     "Audio asporto undique alo possimus tempore thesis corpus vinitor depereo. Conscendo vester coma dens amoveo. Collum calamitas comedo concedo defero aggredior vulgaris optio currus corroboro.",
//   //   due_date: "2024-10-12T15:22:00.972Z",
//   //   status: "In_Progress",
//   //   priority: "Excepteur ex laboris ullamco amet",
//   // },
//   // {
//   //   id: -1442659528,
//   //   created_at: "2024-10-12T18:37:53.945Z",
//   //   title: "molestiae temeritas comparo",
//   //   description:
//   //     "Praesentium constans conservo suffoco via uter depulso cohibeo casso. Conqueror tero urbs tantum adicio claudeo. Clementia occaecati communis alveus eos.",
//   //   due_date: "2024-10-13T04:55:59.046Z",
//   //   status: "In_Progress",
//   //   priority: "ullamco nisi dolore aliquip sit",
//   // },
//   // {
//   //   id: 235530320,
//   //   created_at: "2024-10-13T10:48:45.414Z",
//   //   title: "bardus succurro ullus",
//   //   description:
//   //     "Officia accendo patrocinor nulla statua. Denique temptatio somnus abduco certus ubi ciminatio artificiose. Statim accusamus dedecor.",
//   //   due_date: "2024-10-12T18:26:53.903Z",
//   //   status: "In_Progress",
//   //   priority: "exercitation ullamco in",
//   // },
//   // {
//   //   id: 123123,
//   //   created_at: "2024-10-13T10:48:45.414Z",
//   //   title: "bardus succurro ullus",
//   //   description:
//   //     "Officia accendo patrocinor nulla statua. Denique temptatio somnus abduco certus ubi ciminatio artificiose. Statim accusamus dedecor.",
//   //   due_date: "2024-10-12T18:26:53.903Z",
//   //   status: "In_Progress",
//   //   priority: "exercitation ullamco in",
//   // },
//   // {
//   //   id: 2432342,
//   //   created_at: "2024-10-13T10:48:45.414Z",
//   //   title: "bardus succurro ullus",
//   //   description:
//   //     "Officia accendo patrocinor nulla statua. Denique temptatio somnus abduco certus ubi ciminatio artificiose. Statim accusamus dedecor.",
//   //   due_date: "2024-10-12T18:26:53.903Z",
//   //   status: "In_Progress",
//   //   priority: "exercitation ullamco in",
//   // },
//   // {
//   //   id: 56,
//   //   created_at: "2024-10-13T10:48:45.414Z",
//   //   title: "bardus succurro ullus",
//   //   description:
//   //     "Officia accendo patrocinor nulla statua. Denique temptatio somnus abduco certus ubi ciminatio artificiose. Statim accusamus dedecor.",
//   //   due_date: "2024-10-12T18:26:53.903Z",
//   //   status: "In_Progress",
//   //   priority: "exercitation ullamco in",
//   // },
// ];
