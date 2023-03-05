import { motion } from 'framer-motion';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 16px 32px -16px black;
  width: 100%;
  height: 90%;
`;

const MotionBox = styled(motion.div)`
 
  width: 160px;
  height: 160px;
  border-radius: 8px;
  margin: 16px;
  box-shadow: 0 16px 32px -16px black;
`;

const What = () => {

const user = useSelector((state) => state.auth.user);

  return (
    <div className="mt-20 flex items-center justify-center w-[100vw] h-[90vh] border bg-red-100">
      {" "}
      <MotionBox
        drag
        dragConstraints={{ left: -460, right: 1066, top: -290, bottom: 290 }}
        className="bg-orange-900 flex items-center justify-center "
      >
        <span className="font-bold uppercase"> {user?.username}</span>
      </MotionBox>
      <MotionBox
        drag
        dragConstraints={{ left: -650, right: 875, top: -290, bottom: 290 }}
        className="bg-yellow-500 flex items-center justify-center "
      >
        <span className="font-bold uppercase"> {user?.username}</span>
      </MotionBox>
      <MotionBox
        drag
        dragConstraints={{ left: -850, right: 680, top: -290, bottom: 290 }}
        className="bg-blue-900 flex items-center justify-center "
      >
        <span className="font-bold uppercase"> {user?.username}</span>
      </MotionBox>
      <MotionBox
        drag
        dragConstraints={{ left: -1050, right: 480, top: -290, bottom: 290 }}
        className="bg-light-green-900 flex items-center justify-center "
      >
        <span className="font-bold uppercase"> {user?.username}</span>
      </MotionBox>
    </div>
  );
}

export default What