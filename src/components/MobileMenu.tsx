"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Instagram, Youtube, Library } from "lucide-react"; // Library icon as Blog placeholder

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className="md:hidden">
            {/* 햄버거 버튼 */}
            <button
                onClick={toggleMenu}
                className="p-2 -mr-2 text-gray-600 hover:text-black transition"
                aria-label="메뉴 열기"
            >
                <Menu size={24} />
            </button>

            {/* 오버레이 메뉴 */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] bg-white animate-fade-in flex flex-col gap-8">
                    {/* 상단 닫기 버튼 */}
                    <div className="h-16 px-6 flex items-center justify-between border-b border-gray-100">
                        <span className="font-serif font-bold text-lg"></span>
                        <button
                            onClick={closeMenu}
                            className="p-2 -mr-2 text-gray-600 hover:text-black transition"
                            aria-label="메뉴 닫기"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    {/* 메뉴 링크들 */}
                    <nav className="flex-1 flex flex-col justify-center items-center bg-white/80 gap-8 text-xl font-serif font-medium text-gray-800">
                        <Link href="/about" onClick={closeMenu} className="hover:text-black">
                            소개
                        </Link>
                        <Link href="/archive" onClick={closeMenu} className="hover:text-black">
                            전시기록
                        </Link>
                        <Link href="/media" onClick={closeMenu} className="hover:text-black">
                            언론보도
                        </Link>
                        <Link href="/mall" onClick={closeMenu} className="hover:text-black">
                            SHOP
                        </Link>
                        <Link href="/contact" onClick={closeMenu} className="hover:text-black">
                            찾아오시는길
                        </Link>
                    </nav>

                    {/* 하단 소셜 링크 */}
                    <div className="pb-12 flex gap-8 justify-center text-gray-400">
                        <a
                            href="https://www.instagram.com/artwaygallery_story/"
                            target="_blank"
                            className="hover:text-black"
                        >
                            <Instagram size={24} />
                        </a>
                        <a
                            href="https://blog.naver.com/art_way_"
                            target="_blank"
                            className="hover:text-black"
                        >
                            <Library size={24} /> {/* Blog icon placeholder */}
                        </a>
                        <a
                            href="https://www.youtube.com/@artwaygallerybusan"
                            target="_blank"
                            className="hover:text-black"
                        >
                            <Youtube size={24} />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
