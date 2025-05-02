// imports db connection and schema
import { connect } from "@/dbConfig/dbConfig"
import DoctorSchema from "@/schemas/DoctorSchema";

// connect to database
connect();

// POST method for adding data to database
export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        // taking body parameters
        const { name, role, experience, qualification, city, state, hospital, mode, fees, language, profileImage } = body; 

        // validation
        if (!name || !role || !experience || !qualification || !city || !state || !hospital || !mode || !fees || !language || !profileImage) {
            return Response.json({error: "Missing required fields"}, { status: 400 });
        }

        // add new doctor
        const doctor = new DoctorSchema({ name, role, experience, qualification, city, state, hospital, mode, fees, language, profileImage });
        await doctor.save();

        return Response.json({ success: "Doctor data has been added succesfully", payload: doctor });

    } catch (error) {
        console.log("Internal server error");
        console.log(error);
        return Response.json({ error: "Internal server error"}, { status: 500 });
    }
}