"use client";
import React,{useEffect, useState} from "react";
import { Html5QrcodeScanner } from 'html5-qrcode'


const Scanner = () => {

    const [Result,setResult]=useState()

    useEffect(()=>{
        const scanner = new Html5QrcodeScanner('reader',{
            qrbox:{
              width:250,
              height:250
            },
            fps:5,
          })
          scanner.render(success,error);
          function success(result){
            scanner.clear();
            setResult(result)
          }
          function error(err) {
        console.warn(err);
          }
    },[])

  
  return (
    <div>
      <h1>QR CODE SCAN WITH NEXT JS</h1>
      {Result?<h2>ID : {Result} </h2>:<div id="reader"></div>}
    </div>
  );
};

export default Scanner;
