import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

//css
import '../css/ItQuiz.css';

function ItQuiz() {
  const [quizList, setQuizList] = useState([]);

  // DB에서 퀴즈 목록 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('http://localhost:8080/quizList', {
          method: 'GET'
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setQuizList(result);
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  },[]);

  const columns = [
    { field: 'idx', headerName: 'No', width: 70 },
    { field: 'title', 
      headerName: 'Title', 
      width: 200,
      renderCell : (params) => {
        return (
          <div className='titleList'>
            <img className="titleListImg" src={params.row.title_img} alt="" />
            {params.row.title}
          </div>
        )
      },
    },
    { field: 'content', headerName: 'Content', width: 300 },
    {
      // 짧은 글로 볼 수 있게 페이지 연결
      field: 'learn',
      headerName: 'Learn',
      width: 120,
      renderCell : (params) => {
  
        return (
            <Link key={params.id} to={'/ItQuiz/' + params.id}>
              <button className="learnBtn">Learn</button>
            </Link>
        )
      },
    },
    {
      //퀴즈 시작 버튼
      field: 'start',
      headerName: 'Start',
      width: 120,
      renderCell : (params) => {
        return (
              <Link key={params.id} to={'/ItQuiz/' + params.id}>
                <button className="startBtn">Start</button>
              </Link>
        )
      },
    }
  ];

  return (
    <div className='Table_Box'>
      <DataGrid
        rows={quizList}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={(row) => row.idx}
        pageSize={5}
        rowPerPageOptions={[5]}
      />
    </div>
  );
}

export default ItQuiz;