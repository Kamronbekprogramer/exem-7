import { Button, TextField, InputAdornment } from "@mui/material";
import { CategoryModal } from "@modal";
import { CategoryTable } from "@ui";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Search } from "@mui/icons-material";
import category from "../../service/category"; 

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
  });

  const getData = async () => {
    try {
      const response = await category.get({
        ...params,
        search, 
      }); 
      if (response.status === 200 && response?.data?.categories) {
        setData(response?.data?.categories);
        let total = Math.ceil(response?.data?.total_count / params.limit);
        setCount(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params, search]);

  const handleChange = (event, value) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setParams((prevParams) => ({
      ...prevParams,
      page: 1,
    }));
    console.log(value);
  };

  return (
    <>
      <CategoryModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="w-[400px]">
            <TextField
              variant="outlined"
              placeholder="Search..."
              fullWidth
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-gray-400" />
                  </InputAdornment>
                ),
                style: {
                  paddingRight: "12px",
                  height: "45px",
                },
              }}
            />
          </div>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create Category
          </Button>
        </div>
        <CategoryTable data={data} />
        <Pagination count={count} page={params.page} onChange={handleChange} />
      </div>
    </>
  );
};

export default Index;
