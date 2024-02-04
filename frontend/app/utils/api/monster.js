"use server";

const { createClient } = require("@supabase/supabase-js");
import { decode } from "base64-arraybuffer";

// ラベルに応じてモンスター生成用プロンプトを作成
async function prompts(label, animal, color) {
  // const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  // const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const promptCategories = {
    base: `${animal} monster, baby, cute and adorable, ${color} body, full body, solo, white background, elaborate, high detail, high definition, anime style`,
    study: `${animal} monster, adult, cute and adorable, equipment made of books, ${color} body, full body, solo, white background, elaborate, high detail, high definition, anime style`,
    sports: `${animal} monster, adult, beefy body, ${color} body, full body, solo, white background, elaborate, high detail, high definition, anime style`,
    money: `${animal} monster, adult, cute and adorable, equipped with luxurious armor, ${color} body, full body, solo, white background, elaborate, high detail, high definition, anime style`,
    love: `${animal} monster, adult, chibi, figur, mature figure, beefy body, ${color} body, full body, solo, white background, elaborate, high detail, high definition, anime style`,
  };
  if (label in promptCategories) {
    const prompts = [
      {
        text: `${promptCategories[label]}`,
        weight: 1,
      },
      {
        text: "human, realism, mechanical, not cute, bad face, bad fingers, bad anatomy, missing fingers, low res, blurry, cropped head, signature, watermark, username, artist name, text, 3D image",
        weight: -1,
      },
      {
        text: "background, body shadow",
        weight: -2,
      },
    ];
    return prompts;
  } else {
    throw new Error(`PROMPT ERROR: not exist ${label} in prompts object`);
  }
}
// fetchからtry catchまでを関数化
async function fetchFunction(url, config) {
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      console.error(response);
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`API error: fetch error`);
  }
}
// 目標からカテゴリを判定
async function getGoalCategory(texts) {
  const url = "https://api.nlpcloud.io/v1/bart-large-mnli/classification";
  const raw = JSON.stringify({
    text: texts,
    labels: ["sports", "study", "love", "money"],
    multi_class: false,
  });
  const config = {
    method: "POST",
    headers: {
      Authorization: "Token " + process.env.NEXT_PUBLIC_NLPCLOUD_API_KEY,
      "Content-Type": "application/json",
    },
    body: raw,
  };

  const data = await fetchFunction(url, config);
  console.log(data);
  return data;
}
// モンスター画像を生成
async function generateMonsterImage(label, animal, color, seed) {
  const prompt = await prompts(label, animal, color);
  const url =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
  const raw = JSON.stringify({
    steps: 50,
    height: 1024,
    width: 1024,
    seed: seed,
    csg_scale: 12,
    samples: 1,
    text_prompts: prompt,
  });
  const config = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_STABILITY_API_KEY,
      "Content-Type": "application/json",
    },
    body: raw,
  };
  const data = await fetchFunction(url, config);
  return data;
}
// モンスター画像の背景を透過
async function removeBackground(base64Image) {
  const url = "https://api.remove.bg/v1.0/removebg";
  const raw = JSON.stringify({
    image_file_b64: base64Image,
  });
  const config = {
    method: "POST",
    headers: {
      accept: "application/json",
      "X-API-Key": process.env.NEXT_PUBLIC_REMOVEBG_API_KEY,
      "Content-Type": "application/json",
    },
    body: raw,
  };
  const data = await fetchFunction(url, config);
  return data;
}

// 画像をsupabaseへアップロード
async function uploadImage(base64Image) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const timestamp = new Date().getTime();
  const uniqueIdentifier = Math.random().toString(36).substring(2, 9);
  const imageFileName = `${timestamp}_${uniqueIdentifier}.png`;
  try {
    const { data, error } = await supabase.storage
      .from("reflect_monster")
      .upload(`monsters/${imageFileName}`, decode(base64Image), {
        contentType: "image/png",
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data);
    if (error) {
      console.error("Error uploading image:", error.message);
      throw error;
    } else {
      console.log("Image uploaded successfully. URL:", data.fullpath);
      return imageFileName;
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

// モンスター生成の一連の処理 monster objectを返す
export async function generateMonster(goalContent, {evolution_stage, animal, color, seed} = monster) {

  // let topLabel = "base";
  // if (evolution_stage === 1) {
  //   const categoryData = await getGoalCategory(goalContent);
  //   const labelArray = categoryData.labels.map((label, index) => ({
  //     label: label,
  //     score: categoryData.scores[index],
  //   }));
  //   topLabel = labelArray.sort((a, b) => (a.score > b.score ? -1 : 1))[0][
  //     "label"
  //   ];
  // } else if (evolution_stage > 2) {
  //   throw new Error("evolutionStage only accept 0 or 1");
  // }

  let topLabel = "";
  if (evolution_stage === 0) {
  topLabel = "base";
  } else if (evolution_stage === 1) {
    topLabel = "sports"
  } else if (evolution_stage >= 2) {
    throw new Error("evolutionStage only accept 0 or 1");
  }

  const monsterImageBase64 = await generateMonsterImage(
    topLabel,
    animal,
    color,
    seed
  );
  const seedValue = monsterImageBase64.artifacts[0].seed;
  const generatedImage = monsterImageBase64.artifacts[0].base64;

  //TODO 画像背景透過処理 本番では動作させる
  const removeBackgroundData = await removeBackground(generatedImage);
  const removeBackgroundImage = removeBackgroundData.data.result_b64;
  const imagePath = await uploadImage(removeBackgroundImage);

  // const imagePath = await uploadImage(generatedImage);

  return { imagePath, seedValue };
}
