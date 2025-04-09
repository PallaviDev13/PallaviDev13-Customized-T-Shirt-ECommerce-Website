import React, { useState, useRef } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import { useParams } from 'react-router-dom';
import useImage from 'use-image';
import axios from "axios"
import Layout from '../components/Layout/Layout';
import { useCart } from "../context/cart";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
};



const URLImage = ({ src, ...rest }) => {
  const [image] = useImage(src, 'anonymous');
  return <Image image={image} width={500} height={500} {...rest} />;
};

const CustomizeProduct = () => {
  const navigate = useNavigate()  
    const [cart,setCart]=useCart()
  const { customize } = useParams();
  const [uri,Seturi]=useState("")
  const stageRef = useRef(); 

  const [textProps, setTextProps] = useState({
    x: 50,
    y: 100,
    text: 'Your Text Here',
    fontSize: 40,
    fill: 'black',
    draggable: true,
  });

  
  const handleExport = () => {
    const DataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
    console.log(uri)
    const link = document.createElement('a');
    link.download = 'custom-tshirt.png';
    link.href = DataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = async(e)=>{
    const DataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
    try{
      
      const formData  = new FormData();
      formData.append("photo", dataURLtoBlob(DataURL)); // convert base64 image to blob
      formData.append("Product_Id", customize);

      const {data} = await axios.post("http://localhost:8080/api/v1/product/create-customize-product",formData,{withCredentials:true} )
      
      if (data?.success) {
        toast.success(data?.message);
         setCart([...cart, data.products]);
                                localStorage.setItem(
                                  "cart",
                                  JSON.stringify([...cart, data.products])
                                );
                                toast.success("Item Added to cart");
                               
                              
      } else {
        toast.custom(
          <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md">
            Product Created Successfully!
          </div>
        );
        toast.success("Product Created Successfully");
        navigate("/cart")
      }
    }catch(err){
      console.log(err);
      
    }
    Seturi(DataURL)
    
  }

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '2rem',
          justifyContent: 'center',
        }}
        className="product-details"
      >
        {/* Canvas */}
        <div
          style={{
            border: '2px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '20px',
            background: '#f9f9f9',
          }}
        >
          <Stage width={500} height={500} ref={stageRef}>
            <Layer>
              <URLImage
                src={`/api/v1/product/product-photo/${customize}`}
                x={0}
                y={0}
              />
              <Text
                {...textProps}
                onClick={() => console.log('text clicked')}
                onDragEnd={(e) =>
                  setTextProps({
                    ...textProps,
                    x: e.target.x(),
                    y: e.target.y(),
                  })
                }
              />
            </Layer>
          </Stage>
        </div>
       

        {/* Controls */}
        <div
          style={{
            marginLeft: '2rem',
            padding: '1rem',
            background: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #ddd',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            maxWidth: '300px',
            width: '100%',
          }}
        >
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Customize Text</h3>

          {/* Text input */}
          <label
            style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}
          >
            Enter Text:
          </label>
          <input
            type="text"
            value={textProps.text}
            onChange={(e) =>
              setTextProps({ ...textProps, text: e.target.value })
            }
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />

          {/* Color picker */}
          <label
            style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}
          >
            Text Color:
          </label>
          <input
            type="color"
            value={textProps.fill}
            onChange={(e) =>
              setTextProps({ ...textProps, fill: e.target.value })
            }
            style={{ width: '100%', marginBottom: '15px', height: '40px' }}
          />

          {/* Font size slider */}
          <label
            style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}
          >
            Font Size: {textProps.fontSize}
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={textProps.fontSize}
            onChange={(e) =>
              setTextProps({ ...textProps, fontSize: parseInt(e.target.value) })
            }
            style={{ width: '100%' }}
          />

        
          <label
            style={{ fontWeight: 'bold', display: 'block', margin: '15px 0 5px' }}
          >
            download the design:
          </label>
          <button
            style={{
              backgroundColor: '#1B415F',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              width: '100%',
              cursor: 'pointer',
            }}
            onClick={handleExport}
          >
            Download T-shirt Design
          </button>
          <label
            style={{ fontWeight: 'bold', display: 'block', margin: '15px 0 5px' }}
          >
            Save the design to cart:
          </label>
          <button
            style={{
              backgroundColor: '#1B415F',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              width: '100%',
              cursor: 'pointer',
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
       
      </div>
    </Layout>
  );
};

export default CustomizeProduct;
