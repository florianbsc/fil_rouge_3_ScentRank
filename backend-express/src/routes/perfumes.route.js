import express from "express"
// import { PerfumesModel } from "../models/perfumes.model";

const router = express.Router();

router.get("/create", async (req,res)=> {
    res.json("créer parfum");
});

router.get("/read", async (req,res)=> {
    res.json("boob");
    // try {
    //     const response = await PerfumesModel.find();
    //     res.json(response);
    // }
    // catch(err){
    //     res.json(err);
    // }
});

router.get("/delete", async (req,res)=> {
    res.json("sup parfum");
});

export { router as perfumesRouter};