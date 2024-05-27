 // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   contract TodoList {
       struct Task {
           uint id;
           string content;
           bool completed;
       }

       mapping(address => Task[]) public tasks;

       function addTask(string memory _content) public {
           tasks[msg.sender].push(Task(tasks[msg.sender].length, _content, false));
       }

       function editTask(uint _id, string memory _newContent) public {
           tasks[msg.sender][_id].content = _newContent;
       }

       function toggleCompleted(uint _id) public {
           tasks[msg.sender][_id].completed = !tasks[msg.sender][_id].completed;
       }
   }