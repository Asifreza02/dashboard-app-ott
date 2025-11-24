'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TableData } from '@/utils/data';

interface TableSectionProps {
    title: string;
    data: TableData[];
    columns: string[];
}

export default function TableSection({ title, data, columns }: TableSectionProps) {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <section className="sticky top-0 min-h-screen flex flex-col items-center justify-center z-10 pointer-events-none py-20">
            <div className="w-full max-w-6xl px-4 pointer-events-auto">
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-slate-800 mb-2">{title}</h2>
                        <div className="w-16 h-1 bg-slate-800 mx-auto mt-4"></div>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <select
                                value={rowsPerPage}
                                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                className="bg-white border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                            <span>entries per page</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">Search:</span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-white border border-slate-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-100/50 border-b border-blue-200">
                                    {columns.map((col, i) => (
                                        <th key={i} className="px-6 py-4 font-bold text-slate-700">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((row, i) => {
                                    const isAlbumTable = columns.length === 5;

                                    return (
                                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            {/* First column - Name (Artist name or Album name) */}
                                            <td className="px-6 py-4 font-medium text-slate-800">{row.name}</td>

                                            {/* Album table has extra columns */}
                                            {isAlbumTable && (
                                                <>
                                                    {/* Artist column - empty for now as we don't have artist per album */}
                                                    <td className="px-6 py-4 text-slate-600">-</td>
                                                    {/* Project Code column */}
                                                    <td className="px-6 py-4 text-slate-600">{row.code || '-'}</td>
                                                </>
                                            )}

                                            {/* Revenue column */}
                                            <td className="px-6 py-4 text-slate-600">{row.revenue.toFixed(3)}</td>
                                            {/* Total column */}
                                            <td className="px-6 py-4 text-slate-600">{row.total.toFixed(3)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-6 text-sm text-slate-600">
                        <div>
                            Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} entries
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded hover:bg-slate-100 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded hover:bg-slate-100 disabled:opacity-50"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
