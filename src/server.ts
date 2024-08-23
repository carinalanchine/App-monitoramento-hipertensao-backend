import express from "express";
import authRouter from "./infra/routes/auth.routes";
import healthAgentRouter from "./infra/routes/health-agent.routes";
import dotenv from "dotenv";
import patientRouter from "./infra/routes/patient.routes";
import medicineRouter from "./infra/routes/medicine.routes";
import bloodPressureRouter from "./infra/routes/blood-pressure.routes";
import videoRouter from "./infra/routes/video.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(healthAgentRouter);
app.use(patientRouter);
app.use(medicineRouter);
app.use(bloodPressureRouter);
app.use(videoRouter);

app.route("/").get((req, res) => {
    res.send("Server is running.");
});

app.listen(3333, () => console.log(`Server is running at 3333.`));
