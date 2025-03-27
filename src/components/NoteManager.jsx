import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { FaPlus } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

const NoteManager = () => {
    const [form, setForm] = useState({ day: "", solutions: ["", "", ""] });
    const [notesArray, setNotesArray] = useState([]);
    const [isExpanded, setIsExpanded] = useState({}); // State to track expanded cards


    const handleShare = (note) => {
        const formattedContent = formatNoteForSharing(note); // Format the note content

        // Prepare the share data
        const shareData = {
            title: `Day ${note.day} Notes`, // Title for the share dialog
            text: formattedContent, // Main content to share

            //   url: "https://your-deployed-app-url.com",
        };

        // Check if Web Share API is supported
        if (navigator.share) {
            navigator
                .share(shareData)
                .then(() => {
                    toast("Note shared successfully!", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                })
                .catch((error) => {
                    console.error("Error sharing:", error);
                    toast("Sharing failed. Copying to clipboard instead.", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                    // Fallback: Copy the note content to clipboard
                    navigator.clipboard.writeText(formattedContent).then(() => {
                        toast("Note copied to clipboard!", {
                            position: "top-right",
                            autoClose: 2000,
                        });
                    });
                });
        } else {
            // If Web Share API is not supported, fall back to clipboard copy
            navigator.clipboard.writeText(formattedContent).then(() => {
                toast("Note copied to clipboard!", {
                    position: "top-right",
                    autoClose: 2000,
                });
            });
        }
    };

    const formatNoteForSharing = (note) => {
        let formattedText = `Day: ${note.day}\n\n`; // Start with the day number
        note.solutions.forEach((solution, index) => {
            if (solution) {
                formattedText += `Question ${index + 1}:\n${solution.trim()}\n\n`; // Add each solution
            }
        });
        return formattedText.trim(); // Remove extra whitespace
    };

    const addQuestion = () => {
        setForm({ ...form, solutions: [...form.solutions, ""] });
    };

    useEffect(() => {
        let notes = localStorage.getItem("notes");
        if (notes) {
            const parsedNotes = JSON.parse(notes);
            const updatedNotes = parsedNotes.map((note) => {
                if (note.solution1 || note.solution2 || note.solution3) {
                    return {
                        ...note,
                        solutions: [note.solution1 || "", note.solution2 || "", note.solution3 || ""],
                    };
                }
                return note;
            });
            setNotesArray(updatedNotes);
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
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

    const saveNote = (e) => {
        e.preventDefault(); // Prevent default form submission
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
                solutions: form.solutions.map((solution, index) =>
                    solution || updatedNotes[existingNoteIndex].solutions[index]
                ),
            };
            setNotesArray(updatedNotes);
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            toast("Note Updated!", {
                position: "top-right",
                autoClose: 2000,
            });
        } else {
            // Add a new note
            const newNote = { id: uuidv4(), day: form.day, solutions: form.solutions };
            setNotesArray([...notesArray, newNote]);
            localStorage.setItem("notes", JSON.stringify([...notesArray, newNote]));
            toast("Note Saved!", {
                position: "top-right",
                autoClose: 2000,
            });
        }

        // Clear the form
        setForm({ day: "", solutions: ["", "", ""] });
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

    const editNote = (e, note) => {
        e.preventDefault(); // Prevent default behavior
        setForm({
            day: note.day,
            solutions: note.solutions,
        });
        toast("Editing Note...", {
            position: "top-right",
            autoClose: 2000,
        });
    };

    const handleChange = (e, index) => {
        if (index !== undefined) {
            // Handle changes for the solutions array
            const updatedSolutions = [...form.solutions];
            updatedSolutions[index] = e.target.value;
            setForm({ ...form, solutions: updatedSolutions });
        } else {
            // Handle changes for the day field
            setForm({ ...form, [e.target.name]: e.target.value });
        }
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
            <div className="border bg-[linear-gradient(to_right,#31C48D,#8DA2FB)]">
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
                                href="https://www.programiz.com/java-programming/online-compiler/"
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
                            onChange={(e) => handleChange(e)}
                            value={form.day}
                            placeholder="Enter Day"
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            type="text"
                            id="day"
                            name="day"
                        />

                        {form.solutions.map((solution, index) => (
                            <textarea
                                key={index}
                                onChange={(e) => handleChange(e, index)}
                                value={solution}
                                placeholder={`Enter Java Code for Question ${index + 1}`}
                                className="rounded-lg border border-green-500 w-full p-4"
                                rows="4"
                            />
                        ))}
                        <button
                            onClick={addQuestion}
                            className="flex justify-center items-center bg-blue-400 rounded-full w-fit hover:bg-blue-300 px-3 py-2 gap-2 border border-blue-900 mb-4"
                        >
                            <FaPlus size={22} className="text-white" />
                            Add Question
                        </button>

                        <button
                            onClick={(e) => saveNote(e)} // Pass the event to prevent default behavior
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
                                                    editNote(e, note);
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
                                            <span className="cursor-pointer" onClick={(e) => {
                                                e.stopPropagation();
                                                handleShare(note);
                                            }}>
                                                <FaShare size={20} className="text-blue-500 hover:text-blue-700 transition duration-200" />
                                            </span>
                                        </div>
                                    </div>
                                    {isExpanded[note.id] && (
                                        <div className="bg-[#bcf0dad1] p-4 mt-2 rounded-md space-y-4">
                                            {note.solutions.map((solution, index) => (
                                                solution && (
                                                    <div key={index}>
                                                        <h4 className="font-semibold">Question {index + 1}:</h4>
                                                        <pre className="bg-gray-100 p-2 rounded-md overflow-auto whitespace-pre-wrap">
                                                            {solution}
                                                        </pre>
                                                        <div
                                                            className="copyicon size-7 cursor-pointer mt-2"
                                                            onClick={() => copyText(solution)}
                                                        >
                                                            <FaClipboard size={23} className="text-gray-600 hover:text-green-500 transition duration-200" />
                                                        </div>
                                                    </div>
                                                )
                                            ))}
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