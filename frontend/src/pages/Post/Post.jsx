import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


function Post(){
  const [postList, setPostList] = useState([]);


  // DB에서 게시글 불러오기
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('http://localhost:8080/post', {
          method: 'GET'
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setPostList(result);
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  },[]);

  const columns = [
    { field: 'idx', headerName: 'No', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'writer', headerName: 'Writer', width: 200 },
    { field: 'postDate', headerName: 'Date', width: 200 }
  ];

  return (
    <div className='Table_Box'>
      <DataGrid
        rows={postList}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={(row) => row.idx}
        pageSize={5}
        rowPerPageOptions={[5]}
      />
    </div>
  )
}

export default Post;