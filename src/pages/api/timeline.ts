import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
      .from("timeline")
      .select("id, title, description, date_of_event, images, tags, is_draft")
      .eq("is_draft", false)
      .order("date_of_event", { ascending: true });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch timeline events" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
