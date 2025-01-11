import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './css/View.css';
import { Button } from '@/components/ui/button';
import Notification from '@/Modules/Notification';

export default function View() {
    const [singleDocument, setSingleDocument] = useState({});
    const [name, setName] = useState("");
    const fullURL = window.location.href;

    const { id } = useParams();

    const fetchDocument = async () => {
        try {
            const response = await fetch(`https://document-management-app-pwr7.onrender.com/api/fetchOneDocument/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                setSingleDocument(responseData.document);
                setName(responseData.name)
                
            }
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    useEffect(() => {
        fetchDocument();
    }, []);

    const downloadImage = async (imageUrl,name) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = name;
            link.click();
            Notification("Download started Successfully ✅","success")
        } catch (error) {
            Notification("Failed to Download ❌","error")
        }
    };

    const copyToClipboard = () => {
        if (singleDocument.url) {
            navigator.clipboard.writeText(fullURL)
                .then(() => {
                    // alert("URL copied to clipboard!");
                    Notification("URL copied to clipboard ✅","success");
                })
                .catch((error) => {
                    // console.error("Failed to copy URL:", error);
                    Notification("Failed to copy URL ❌","error");
                });
        } else {
            Notification("No URL is there to copy ❌","info")
        }
    };

    return (
        <div className="image-view-container">
            <div className="image-wrapper">
                {singleDocument.url ? (
                    <>
                        <img
                            src={singleDocument.url}
                            alt="Document"
                            className="image-display"
                        />
                        <Button
                            className="copy-url-button"
                            onClick={copyToClipboard}
                        >
                            Copy URL
                        </Button>
                        <br />
                        <button onClick={() => downloadImage(singleDocument.url,name)}>
                            Download
                        </button>
                    </>
                ) : (
                    <p>Loading document...</p>
                )}
            </div>
        </div>
    );
}
