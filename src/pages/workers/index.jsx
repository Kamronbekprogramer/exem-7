import { Button, TextField, InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import { WorkersModal } from "@modal";
import { WorkersTable } from "@ui";
import Pagination from "@mui/material/Pagination";
import { Search } from "@mui/icons-material";
import workers from "../../service/workers";

function Index() {
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
      const response = await workers.get({
        ...params,
        search, 
      });
      if (response.status === 200 && response?.data?.user) {
        setData(response?.data?.user);
        let total = Math.ceil(response?.data?.totcal_count / params.limit);
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
  };

  return (
    <>
      <WorkersModal open={open} handleClose={() => setOpen(false)} />
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
            Add Worker
          </Button>
        </div>
        <WorkersTable data={data} />
        <Pagination count={count} page={params.page} onChange={handleChange} />
      </div>
    </>
  );
}

export default Index;

