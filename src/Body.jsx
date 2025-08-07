import React, { useState } from "react";
import {
  PencilSquareIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

import { Dialog1, Dialog2, Dialog8 } from "./Dialog.jsx";
import { useSubject } from "./SubjectContext";
import Topics from "./Topics.jsx";

function Body(props) {
  const [viewedTopic, setViewedTopic] = useState(null);
  const { selectedSubject, setSelectedSubject } = useSubject();

  // --- All original logic is preserved ---
  const determineProgress = (subject) => {
    const currentSub = props.subjects.find((sub) => sub.id === subject.id);
    if (!currentSub || !Array.isArray(currentSub.topics) || currentSub.topics.length === 0) return 0;
    const completedCount = currentSub.topics.filter((topic) => topic.completed).length;
    return Math.round((completedCount / currentSub.topics.length) * 100);
  };

  function handleNewSubAdd(e) {
    e.preventDefault();
    const subnametemp = document.getElementById("subjectname")?.value.trim();
    if (!subnametemp) return;
    const subname = capitalizeFirstLetter(subnametemp);
    const subdesc = document.getElementById("subjectdesc")?.value.trim();
    const subtags = document.getElementById("subjecttags")?.value.trim().split(" ").filter((tag) => tag.length > 0);
    props.setSubjects([...props.subjects, { id: Date.now(), subname, tags: subtags, currentstatus: "Studying", subdesc, resources: [], topics: [] }]);
    document.getElementById("my_modal_2")?.close();
  }

  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }
  
  function handleDeleteSub(id) {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      const tempSub = props.subjects.filter((e) => e.id !== id);
      props.setSubjects(tempSub);
    }
  }

  const handleStatusChange = (e, subject) => {
    e.stopPropagation(); // Prevents the collapse from opening/closing
    const newStatus = subject.currentstatus === "Studying" ? "Revising" : "Studying";
    props.setSubjects((prev) =>
      prev.map((sub) =>
        sub.id === subject.id ? { ...sub, currentstatus: newStatus } : sub
      )
    );
  };

  const handleTopicDelete = (topicId, selectedSubject) => {
    if (!selectedSubject) return;
    if (window.confirm("Are you sure you want to delete the topic?")) {
      props.setSubjects((prevSubjects) => prevSubjects.map((sub) => sub.id === selectedSubject.id ? { ...sub, topics: sub.topics.filter((topic) => topic.id !== topicId) } : sub));
    }
  };

  const handleStarChange = (topicId, selectedSubject) => {
    if (!selectedSubject) return;
    props.setSubjects((prevSubjects) => prevSubjects.map((sub) => sub.id === selectedSubject.id ? { ...sub, topics: sub.topics.map((t) => t.id === topicId ? { ...t, isStarred: !t.isStarred } : t) } : sub));
  };

  const handleTopicStatusChange = (topicId, selectedSubject) => {
    if (!selectedSubject) return;
    props.setSubjects((prevSubjects) => prevSubjects.map((sub) => sub.id === selectedSubject.id ? { ...sub, topics: sub.topics.map((t) => t.id === topicId ? { ...t, completed: !t.completed } : t) } : sub));
  };

  const handleRemarkChange = (topicId, newRemark) => {
    if (!selectedSubject) return;
    props.setSubjects((prevSubjects) => prevSubjects.map((sub) => sub.id === selectedSubject.id ? { ...sub, topics: sub.topics.map((t) => t.id === topicId ? { ...t, remark: newRemark } : t) } : sub));
  };


  return (
    <>
      <main className="bg-base-200 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl">
                Welcome, <span className="font-bold text-primary">{props.userName}</span>!
              </h1>
              <button onClick={() => document.getElementById("my_modal_1")?.showModal()} className="btn btn-ghost btn-circle btn-sm">
                <PencilSquareIcon className="h-5 w-5" />
              </button>
            </div>
            <button onClick={() => document.getElementById("my_modal_2")?.showModal()} className="btn btn-primary w-full sm:w-auto">
              <PlusIcon className="h-5 w-5" />
              Add Subject
            </button>
          </header>

          {/* Subjects List */}
          <div className="space-y-4">
            {props.subjects.map((subject) => (
              <div key={subject.id} className="card w-full bg-base-100 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="collapse collapse-arrow">
                  <input type="checkbox" className="peer" onClick={() => setSelectedSubject(subject)} />
                  {/* The visible part of the collapse/card header - NOW FULLY RESPONSIVE */}
                  <div className="collapse-title flex flex-col md:flex-row md:items-center justify-between gap-y-4 gap-x-2 text-primary-content bg-primary peer-checked:bg-secondary peer-checked:text-secondary-content">
                    {/* Left Side: Title and Tags */}
                    <div>
                      <h2 className="card-title text-2xl">{subject.subname}</h2>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {subject.tags?.length > 0
                          ? subject.tags.map((tag) => <div key={tag} className="badge badge-neutral badge-outline">{tag}</div>)
                          : <div className="badge badge-ghost text-xs">(No tags)</div>}
                      </div>
                    </div>
                    {/* Right Side: Progress and Status SWAP */}
                    <div className="flex items-center self-end md:self-center gap-4">
                       <div className="radial-progress text-primary-content peer-checked:text-secondary-content" style={{ "--value": determineProgress(subject), "--size": "3.5rem", "--thickness": "5px" }}>
                        {determineProgress(subject)}%
                       </div>
                       {/* RESTORED the interactive DaisyUI swap component */}
                       <label className="z-10 swap swap-flip">
                          <input type="checkbox" checked={subject.currentstatus === 'Revising'} readOnly />
                          <div className="swap-on btn btn-sm btn-success" onClick={(e) => handleStatusChange(e, subject)}>Revising</div>
                          <div className="swap-off btn btn-sm btn-info" onClick={(e) => handleStatusChange(e, subject)}>Studying</div>
                       </label>
                    </div>
                  </div>

                  {/* The content that appears when the card is opened */}
                  <div className="collapse-content bg-base-100">
                    <div className="pt-4 flex justify-between items-center">
                      <p className="text-sm italic text-base-content/70">
                        {subject.topics.length} topics | {subject.topics.filter(t => t.completed).length} completed
                      </p>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                          <EllipsisVerticalIcon className="h-6 w-6" />
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
                          <li><a onClick={() => document.getElementById("my_modal_6")?.showModal()}><ClipboardDocumentListIcon className="h-4 w-4" /> Resources</a></li>
                          <li><a onClick={() => document.getElementById("my_modal_3")?.showModal()} className={!subject.subdesc ? "disabled" : ""}><QuestionMarkCircleIcon className="h-4 w-4" /> Description</a></li>
                          <div className="divider my-1"></div>
                          <li><a onClick={() => handleDeleteSub(subject.id)} className="text-error"><TrashIcon className="h-4 w-4" /> Delete Subject</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="divider">TOPICS</div>
                    <Topics
                      subid={subject.id}
                      subject={subject}
                      setSubjects={props.setSubjects}
                      handleTopicDelete={handleTopicDelete}
                      handleStarChange={handleStarChange}
                      handleTopicStatusChange={handleTopicStatusChange}
                      handleRemarkChange={handleRemarkChange}
                      setViewedTopic={setViewedTopic}
                      viewedTopic={viewedTopic}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Dialogs remain for functionality */}
      <Dialog1 userName={props.userName} setUsername={props.setUsername} />
      <Dialog2 handleNewSubAdd={handleNewSubAdd} />
      <Dialog8 handleRemarkChange={handleRemarkChange} topic={viewedTopic} />
    </>
  );
}

export default Body;