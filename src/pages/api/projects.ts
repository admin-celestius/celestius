import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, description, status, is_draft, link")
      .eq("is_draft", false)
      .order("created_at", { ascending: true });

    if (error) return res.status(500).json({ error: "Failed to fetch projects" });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
