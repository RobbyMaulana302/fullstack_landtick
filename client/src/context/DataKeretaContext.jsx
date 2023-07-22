import { createContext } from "react"

// list data dummy kereta 
const listKereta = [
    {
        id: 1,
        namaKereta: "Argo Wilis",
        berangkat: "05.00",
        tiba: "10.05",
        durasi: "5j 05m",
        harga: "250.000",
        class: "Eksekutif (H)",
        stasiunAwal: "Gambir",
        stasiunAkhir: "Surabaya"
    },
    {
        id: 2,
        namaKereta: "Wilis Argo",
        berangkat: "05.00",
        tiba: "10.05",
        durasi: "5j 05m",
        harga: "100.000",
        class: "Ekonomi (H)",
        stasiunAwal: "Gambir",
        stasiunAkhir: "Surabaya"
    }
]

export const DataKeretaContext = createContext(listKereta)