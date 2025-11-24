"use client";

import { useEffect, useState } from "react";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import SolaceIcon from "@/components/svg/solace";
import { Advocate } from "@/db/schema";


export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const fetchAdvocates = (searchTerm = "") => {
    // paginate & pass search term query
    fetch(`/api/advocates?searchTerm=${searchTerm}`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }

  useEffect(() => {
    fetchAdvocates()
  }, []);


  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
    setInputValue("");
    fetchAdvocates();
  };

  const handleSearch = () => {
    fetchAdvocates(inputValue);
    setSearchTerm(inputValue);
  };

  return (
    <main>
      <div className="w-screen bg-[rgb(40,94,80)] px-6">
        <SolaceIcon />
      </div>
      <div className="mx-8">
        <div className="my-10">
          <h2>Search</h2>
          <p className="my-5">
            Searching for: <span id="search-term">{searchTerm || "Nothing yet"}</span>
          </p>
          <form action={handleSearch} className="flex flex-row gap-x-4">
            <input className="search" placeholder="Search for Advocates" value={inputValue} onChange={onChange} />
            {/* create component library for project */}
            <button type="reset" onClick={handleReset}>Reset</button>
            <button type="submit"> Search</button>
          </form>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Advocates</CardTitle>
            <CardDescription>
              View advocate search results and related information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Specialties</TableHead>
                  <TableHead>Years of Experience</TableHead>
                  <TableHead>Phone Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {advocates.map((advocate) => {
                  return (
                    <TableRow key={advocate.id}>
                      <TableCell>{advocate.firstName}</TableCell>
                      <TableCell>{advocate.lastName}</TableCell>
                      <TableCell>{advocate.city}</TableCell>
                      <TableCell>{advocate.degree}</TableCell>
                      <TableCell>
                        {advocate.specialties.map((s: string) => (
                          <div key={s}>{s}</div>
                        ))}
                      </TableCell>
                      <TableCell>{advocate.yearsOfExperience}</TableCell>
                      <TableCell>{advocate.phoneNumber}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
