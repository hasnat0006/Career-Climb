import React, { useState, useEffect, useCallback } from "react";
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import ColorSelectorNode from "./[UIDetails]";
const initBgColor = "#c9f1dd";
const snapGrid = [20, 20];
const nodeTypes = {
    selectorNode: ColorSelectorNode,
};
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const CustomNodeFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [bgColor, setBgColor] = useState(initBgColor);

    useEffect(() => {
        const onChange = (event) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id !== "2") return node;
                    const color = event.target.value;
                    setBgColor(color);
                    return { ...node, data: { ...node.data, color } };
                })
            );
        };

        setNodes([
            {
                id: "1",
                type: "selectorNode",
                data: { label: "An input node" },
                position: { x: 0, y: 50 },
                targetPosition: "right",
            },
            {
                id: "2",
                type: "selectorNode",
                data: { onChange, color: initBgColor },
                position: { x: 200, y: 50 },
                sourcePosition: "right",
            },
            {
                id: "3",
                type: "output",
                data: { label: "Output A" },
                position: { x: 650, y: 25 },
                targetPosition: "left",
            },
            {
                id: "4",
                type: "output",
                data: { label: "Output B" },
                position: { x: 650, y: 100 },
                targetPosition: "left",
            },
        ]);

        setEdges([
            { id: "e1-2", source: "2", target: "1", sourceHandle: "c", animated: true },
            { id: "e2a-3", source: "2", target: "3", sourceHandle: "a", animated: true },
            { id: "e2b-4", source: "2", target: "4", sourceHandle: "b", animated: true },
        ]);
    }, []);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        []
    );

    return (
        <div className="w-[100vw] h-[100vh]">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                style={{ background: bgColor }}
                nodeTypes={nodeTypes}
                snapToGrid={true}
                snapGrid={snapGrid}
                defaultViewport={defaultViewport}
                fitView
                attributionPosition="bottom-left"
            >
                <MiniMap
                    nodeStrokeColor={(n) => {
                        if (n.type === "input") return "#0041d0";
                        if (n.type === "selectorNode") return bgColor;
                        if (n.type === "output") return "#ff0072";
                    }}
                    nodeColor={(n) => (n.type === "selectorNode" ? bgColor : "#fff")}
                />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default CustomNodeFlow;
