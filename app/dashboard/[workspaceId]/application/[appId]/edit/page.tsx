"use client";
import Editor from "../../_components/Editor";

import React, { useEffect, useState } from "react";
import Sidebar from "../../_components/Sidebar";
import {
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@components/ui/Sidebar/sidebar";
import CodeBlock from "../../_components/CodeBlock";
import ConfigFolder from "../../_components/Config";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

type Props = {};

interface ComponentData {
  id: number;
  x: number;
  y: number;
  content: string;
  // Add more configurable properties as needed
}

const test: ComponentData[] = [
  {
    id: 1,
    content: "Component 1",
    x: 1274,
    y: 415,
  },
  {
    id: 2,
    content: "Component 2",
    x: 574,
    y: 1175,
  },
  {
    id: 3,
    content: "Component 3",
    x: 18,
    y: 822,
  },
  {
    id: 4,
    content: "Component 4",
    x: 877,
    y: 14259,
  },
  {
    id: 5,
    content: "Component 5",
    x: 154,
    y: 421,
  },
];

const page = (props: Props) => {
  const [Data, setData] = useState<ComponentData[]>(test);
  const [Coordinate, setCoordinate] = useState({ x: 0, y: 0 });
  const [activeId, setActiveId] = useState<string>("");
  const [IsDropped, setIsDropped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const filterOperation = (event: any) => {
    const { active, over, delta } = event;
    const droppableRect = over.rect.current;

    const filtered_array = Data.filter((item) => item.id !== Number(active.id));
    if (filtered_array.length === 0) {
      setData((initialData) => [
        ...initialData,
        {
          id: initialData.length + 144,
          content: "Component " + (initialData.length + 1),
          x: event.clientX - droppableRect.left,
          y: event.clientY - droppableRect.top,
        },
      ]);
      return;
    }
    // const rect = event.current.getBoundingClientRect();
    // console.log(rect);

    const tobe_modified_array = Data.filter(
      (item) => item.id === Number(active.id)
    );
    const newData = [
      ...filtered_array,
      {
        id: filtered_array.length + 1,
        content: "Component " + (filtered_array.length + 1),
        x: delta.left + tobe_modified_array[0]?.x,
        y: delta.top + tobe_modified_array[0]?.y,
      },
    ];
    setData(newData);
    console.log(newData);
  };

  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === "droppable") {
      filterOperation(event);
      console.log(event.over.rect.rect);
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
        setIsDropped(false);
        setIsDragging(true);
      }}
      sensors={sensors}
    >
      <div className="relative flex min-h-screen bg-slate-950">
        <div className="flex w-full bg-slate-950 gap-1">
          <SidebarProvider>
            <Sidebar />
            <main className="relative flex-1 w-full">
              <SidebarTrigger />
              <SidebarRail />
              {/* Drag Overlay will act as Our Drag Preview */}
              {/* {isDragging ? (
                <div className="fixed w-screen h-screen bg-black">Dragging</div>
              ) : null} */}
              <div></div>
              <Editor data={Data} />
              <ConfigFolder />
              <CodeBlock />
            </main>
          </SidebarProvider>
        </div>
      </div>
    </DndContext>
  );
};

export default page;
