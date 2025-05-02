// imports db connection and schema
import { connect } from "@/dbConfig/dbConfig"
import DoctorSchema from "@/schemas/DoctorSchema";

// connect to database
connect();

// GET method for fetching data from database
export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);

        const filters: Record<string, unknown> = {};

        // taking query parameters
        const mode = searchParams.get("mode");
        const experience = searchParams.get("experience");
        const fees = searchParams.get("fees");
        const language = searchParams.get("language");
        const facility = searchParams.get("facility");

        if (mode) filters.mode = mode; // mode filter
        if (language) filters.language = { $in: [language] }; // language filter

        // facility filter
        if (facility) {
            if (facility.toLowerCase() === "others") {
                filters.hospital = { $ne: "Apollo Hospital" };
            } else {
                filters.hospital = facility;
            }
        }

        // experience filter
        if (experience) {
            if (experience.includes("-")) {
                const [min, max] = experience.split("-").map(Number);
                filters.experience = { $gte: min, $lte: max };
            } else if (experience.endsWith("+")) {
                const min = parseInt(experience.replace("+", ""));
                filters.experience = { $gte: min };
            }
        }

        // fees filter
        if (fees) {
            if (fees.includes("-")) {
                const [min, max] = fees.split("-").map(Number);
                filters.fees = { $gte: min, $lte: max };
            } else if (fees.endsWith("+")) {
                const min = parseInt(fees.replace("+", ""));
                filters.fees = { $gte: min };
            }
        }

        // fetch doctors with applied filters
        const doctors = await DoctorSchema.find(filters);

        return Response.json({ success: "Doctors data fetched successfully", payload: doctors });

    } catch (error) {
        console.log("Internal server error");
        console.log(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}