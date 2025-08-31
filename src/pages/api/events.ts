import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("id, title, description, event_date, registration_open, registration_close, registration_link")
      .eq("is_draft", false)
      .order("event_date", { ascending: true });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch events" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
