import { useState, useEffect, useMemo } from "react";

export const useFormatDate = (date: number) => {
  //
  const monthInName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = new Date(date);
  //Get time properties
  const minute = formatDate.getMinutes();
  const hour = formatDate.getHours();
  const day = formatDate.getDate();
  const month = formatDate.getMonth();
  const year = formatDate.getFullYear();

  const dateInWords = `${day}-${monthInName[month]}-${year}  ${
    hour.toString().length < 2 ? `0${hour}` : `${hour}`
  }:${minute.toString().length < 2 ? `0${minute}` : `${minute}`}`;

  return dateInWords;
};
