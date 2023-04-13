import { useState, useEffect } from "react";
import Link from "next/link";
import useStorage from "../../hooks/useStorage";
import Widget from "@/components/Widget";
import { TalkJSChat } from "../../components/TalkJSChat";

export default function chat() {

  return (
    <TalkJSChat/>
  );
}
