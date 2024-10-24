import React from 'react';
import Image from 'next/image';

// Khởi tạo đối tượng người dùng
const user = {
    id: "user1",
    name: "Name of User1",
    avatar: "/image/avatar.png",
    bio: "I am a skilled web development engineer with a passion for building modern, user-friendly websites and web applications. " +
         "With a strong foundation in front-end and back-end technologies, I have a deep understanding of frameworks like React, " +
         "Angular, or Vue.js, as well as server-side languages such as Node.js, Python, or PHP. I enjoy problem-solving, optimizing " +
         "code for performance, and staying up to date with the latest trends in web development. In my free time, I often " +
         "explore new tools and technologies to enhance my skills and work on personal projects."
};

export default function InfoUser() {
    return (
        <div>
            <h1 style={{ marginLeft: '50px', marginTop: '30px', fontSize: '2em' }}>
                Profile
            </h1>
            <hr style={{ margin: '10px 20px', border: '1px solid black' }} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    margin: '100px 100px',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Image
                        src={user.avatar} // Sử dụng user.avatar
                        alt="Avatar"
                        width={150}
                        height={150}
                        style={{ borderRadius: '50%' }}
                    />
                    <h1
                        style={{
                            marginTop: '15px',
                            fontSize: '1.1em',
                        }}
                    >
                        {user.name} {/* Sử dụng user.name */}
                    </h1>
                </div>
                <label 
                    htmlFor="" 
                    style={{ 
                        marginLeft: '200px',
                        marginTop: '20px',
                        fontStyle: 'italic', 
                        lineHeight: '1.4',   
                        fontSize: '14px',
                        color: '#333',       
                        maxWidth: '700px',   
                        textAlign: 'justify', 
                    }}
                >
                    {user.bio} {/* Sử dụng user.bio */}
                </label>
            </div>
        </div>
    );
}
