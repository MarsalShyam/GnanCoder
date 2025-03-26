import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const NoteManager = () => {
    const [form, setForm] = useState({ day: "", solution1: "", solution2: "", solution3: "" });
    const [notesArray, setNotesArray] = useState([]);
    const [isExpanded, setIsExpanded] = useState({}); // State to track expanded cards

    useEffect(() => {
        let notes = localStorage.getItem("notes");
        if (notes) {
            setNotesArray(JSON.parse(notes));
        }
    }, []);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast("Copied to Clipboard!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const saveNote = () => {
        if (!form.day) {
            toast("Error: Day is required!", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        // Check if the day already exists in notesArray
        const existingNoteIndex = notesArray.findIndex((note) => note.day === form.day);

        if (existingNoteIndex !== -1) {
            // Update the existing note
            const updatedNotes = [...notesArray];
            updatedNotes[existingNoteIndex] = {
                ...updatedNotes[existingNoteIndex],
                solution1: form.solution1 || updatedNotes[existingNoteIndex].solution1,
                solution2: form.solution2 || updatedNotes[existingNoteIndex].solution2,
                solution3: form.solution3 || updatedNotes[existingNoteIndex].solution3,
            };
            setNotesArray(updatedNotes);
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            toast("Note Updated!", {
                position: "top-right",
                autoClose: 2000,
            });
        } else {
            // Add a new note
            const newNote = { id: uuidv4(), day: form.day, solution1: form.solution1, solution2: form.solution2, solution3: form.solution3 };
            setNotesArray([...notesArray, newNote]);
            localStorage.setItem("notes", JSON.stringify([...notesArray, newNote]));
            toast("🎉🎊Code Saved!👌👌", {
                position: "top-right",
                autoClose: 2000,
            });
        }

        // Clear the form
        setForm({ day: "", solution1: "", solution2: "", solution3: "" });
    };

    const deleteNote = (day) => {
        const confirmDelete = confirm(`Do you really want to delete all notes for Day ${day}?`);
        if (confirmDelete) {
            const updatedNotes = notesArray.filter((note) => note.day !== day);
            setNotesArray(updatedNotes);
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            toast("Deleted Successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const editNote = (note) => {
        setForm({
            day: note.day,
            solution1: note.solution1 || "",
            solution2: note.solution2 || "",
            solution3: note.solution3 || "",
        });
        toast("Editing Note...", {
            position: "top-right",
            autoClose: 2000,
        });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Function to toggle the expanded state of a day card
    const toggleDayCard = (id) => {
        setIsExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle the expanded state for the given ID
        }));
    };

    return (
        <>
            <div className="border bg-[linear-gradient(to_right,#31C48D,#8DA2FB)]
">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
              

                <div className="pt-2 md:mycontainer px-2 md:px-0 min-h-[86vh] md:w-[80%] lg:w-[60%]">
                    <div className="flex justify-center items-center">
                        <div className="text-white bg-green-700 my-2 mx-2 rounded-full flex justify-between items-center ring-black ring-1 w-34 py-1">
                            <a
                                href="https://onecompiler.com/java"
                                className="py-0 md:py-2 font-bold px-2"
                            >
                                <span className="text-black">&lt;</span>
                                Open-JAVA-Compiler
                                <span className="text-black">/&gt;</span>
                            </a>
                        </div>
                    </div>
                    <h1 className="text text-2xl md:text-3xl lg:text-4xl font-bold text-center">
                        <span className="text-green-500">&lt;</span>
                        Gnan
                        <span className="text-green-500">CODER/&gt;</span>
                    </h1>
                    <p className="text-green-900 text-sm md:text-lg lg:text-xl text-center">Your Personal Code Organizer</p>

                    <div className="text-black flex flex-col p-4 gap-8 items-center">
                        <input
                            onChange={handleChange}
                            value={form.day}
                            placeholder="Enter Day"
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            type="text"
                            id="day"
                            name="day"
                        />

                        <textarea
                            onChange={handleChange}
                            value={form.solution1}
                            placeholder="Enter Java Code for Question 1"
                            className="rounded-lg border border-green-500 w-full p-4"
                            rows="4"
                            name="solution1"
                        />

                        <textarea
                            onChange={handleChange}
                            value={form.solution2}
                            placeholder="Enter Java Code for Question 2"
                            className="rounded-lg border border-green-500 w-full p-4"
                            rows="4"
                            name="solution2"
                        />

                        <textarea
                            onChange={handleChange}
                            value={form.solution3}
                            placeholder="Enter Java Code for Question 3"
                            className="rounded-lg border border-green-500 w-full p-4"
                            rows="4"
                            name="solution3"
                        />

                        <button
                            onClick={saveNote}
                            className="flex justify-center items-center bg-green-400 rounded-full w-fit hover:bg-green-300 px-3 py-2 gap-2 border border-green-900"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                                style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                            Save Note
                        </button>
                    </div>

                    <div className="passwords">
                        <h2 className="font-bold text-2xl py-4">Your Notes</h2>
                        {notesArray.length === 0 && <div>No Notes to show.</div>}
                        {notesArray.length > 0 &&
                            notesArray.map((note, index) => (
                                <div key={index} className="mb-4">
                                    <div
                                        className="bg-[#cff1db] rounded-md p-4 shadow-md cursor-pointer flex justify-between items-center"
                                        onClick={() => toggleDayCard(note.id)}
                                    >
                                        <h3 className="font-bold text-lg">Day: {note.day}</h3>
                                        <div className="flex gap-2">
                                            <span
                                                className="cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    editNote(note);
                                                }}
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/fikcyfpp.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#121331,secondary:#000000"
                                                    style={{ width: "22px", height: "22px" }}
                                                ></lord-icon>
                                            </span>
                                            <span
                                                className="cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteNote(note.day);
                                                }}
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: "20px", height: "20px" }}
                                                ></lord-icon>
                                            </span>
                                        </div>
                                    </div>
                                    {isExpanded[note.id] && (
                                        <div className="bg-[#bcf0dad1] p-4 mt-2 rounded-md space-y-4">
                                            {note.solution1 && (
                                                <div>
                                                    <h4 className="font-semibold">Question 1:</h4>
                                                    <pre className="bg-[#fdf5b294] p-2 rounded-md overflow-auto whitespace-pre-wrap">
                                                        {note.solution1}
                                                    </pre>
                                                    <div
                                                        className="copyicon size-7 cursor-pointer mt-2"
                                                        onClick={() => copyText(note.solution1)}
                                                    >
                                                        <img
                                                            className="w-[23px] h-[23px] pt-[3px] pl-[3px]"
                                                            src="/icons/clipboard-fill.png"
                                                            alt="copy"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {note.solution2 && (
                                                <div>
                                                    <h4 className="font-semibold">Question 2:</h4>
                                                    <pre className="bg-[#fdf5b294] p-2 rounded-md overflow-auto whitespace-pre-wrap">
                                                        {note.solution2}
                                                    </pre>
                                                    <div
                                                        className="copyicon size-7 cursor-pointer mt-2"
                                                        onClick={() => copyText(note.solution2)}
                                                    >
                                                        <img
                                                            className="w-[23px] h-[23px] pt-[3px] pl-[3px]"
                                                            src="/icons/clipboard-fill.png"
                                                            alt="copy"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {note.solution3 && (
                                                <div>
                                                    <h4 className="font-semibold">Question 3:</h4>
                                                    <pre className="bg-[#fdf5b294] p-2 rounded-md overflow-auto whitespace-pre-wrap">
                                                        {note.solution3}
                                                    </pre>
                                                    <div
                                                        className="copyicon size-7 cursor-pointer mt-2"
                                                        onClick={() => copyText(note.solution3)}
                                                    >
                                                        <img
                                                            className="w-[23px] h-[23px] pt-[3px] pl-[3px]"
                                                            src="/icons/clipboard-fill.png"
                                                            alt="copy"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NoteManager;