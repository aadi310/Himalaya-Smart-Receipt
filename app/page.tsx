"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import Image from "next/image"
import {
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  History,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  X as XIcon,
} from "lucide-react"

export default function Home() {
  // ---------- Splash intro ----------
  const [showSplash, setShowSplash] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 3300)
    return () => clearTimeout(t)
  }, [])

  // ---------- Receipt data ----------
  const receipts = {
    current: {
      id: "2607081HW05213",
      date: "08-07-2026",
      time: "14:32:10",
      pos: "1",
      brandSpecialist: "Meera R.",
      customerName: "Sourabh",
      mobile: "9887427540",
      items: [
        {
          id: 0,
          name: "Natural Glow Rose Face Cream",
          size: "25g",
          hsnCode: "33049910",
          qty: 1,
          unitAmt: 55,
          discount: 0,
          discountDescription: "",
          totalAmt: 55,
        },
        {
          id: 1,
          name: "Neem Purifying Face Wash",
          size: "150ml",
          hsnCode: "33041000",
          qty: 1,
          unitAmt: 199,
          discount: 20,
          discountDescription: "10% Off",
          totalAmt: 179,
        },
        {
          id: 2,
          name: "Ashwagandha Tablets",
          size: "60s",
          hsnCode: "30049011",
          qty: 1,
          unitAmt: 225,
          discount: 0,
          discountDescription: "",
          totalAmt: 225,
        },
      ],
      subtotal: 459,
      cgst: 41.31,
      sgst: 41.31,
      total: 541.62,
    },
    hist1: {
      id: "2601201HW04791",
      date: "20-01-2026",
      time: "11:05:44",
      pos: "1",
      brandSpecialist: "Ankit V.",
      customerName: "Sourabh",
      mobile: "9887427540",
      items: [
        {
          id: 0,
          name: "Liv.52 Tablets",
          size: "100s",
          hsnCode: "30049011",
          qty: 1,
          unitAmt: 210,
          discount: 0,
          discountDescription: "",
          totalAmt: 210,
        },
        {
          id: 1,
          name: "Charcoal Purifying Face Wash",
          size: "100ml",
          hsnCode: "33041000",
          qty: 1,
          unitAmt: 175,
          discount: 15,
          discountDescription: "Flat ₹15 Off",
          totalAmt: 160,
        },
        {
          id: 2,
          name: "Baby Lotion",
          size: "200ml",
          hsnCode: "33049910",
          qty: 1,
          unitAmt: 190,
          discount: 0,
          discountDescription: "",
          totalAmt: 190,
        },
      ],
      subtotal: 560,
      cgst: 50.4,
      sgst: 50.4,
      total: 660.8,
    },
    hist2: {
      id: "2512051HW03950",
      date: "05-12-2025",
      time: "17:40:02",
      pos: "2",
      brandSpecialist: "Priya S.",
      customerName: "Sourabh",
      mobile: "9887427540",
      items: [
        {
          id: 0,
          name: "Anti-Hairfall Shampoo",
          size: "400ml",
          hsnCode: "33051010",
          qty: 1,
          unitAmt: 299,
          discount: 30,
          discountDescription: "Combo Offer",
          totalAmt: 269,
        },
        {
          id: 1,
          name: "Complete Care Toothpaste",
          size: "150g",
          hsnCode: "33061020",
          qty: 2,
          unitAmt: 89,
          discount: 0,
          discountDescription: "",
          totalAmt: 178,
        },
      ],
      subtotal: 447,
      cgst: 40.23,
      sgst: 40.23,
      total: 527.46,
    },
  }

  const [currentReceiptId, setCurrentReceiptId] = useState("current")
  const currentReceipt = receipts[currentReceiptId]

  const transactionHistory = [
    { id: "current", date: receipts.current.date, amount: receipts.current.total },
    { id: "hist1", date: receipts.hist1.date, amount: receipts.hist1.total },
    { id: "hist2", date: receipts.hist2.date, amount: receipts.hist2.total },
  ]

  // ---------- Item expand/collapse ----------
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const toggleItemExpand = (id: number) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  useEffect(() => {
    setExpandedItems([])
  }, [currentReceiptId])

  // ---------- Feedback (5-point emoji) ----------
  const [rating, setRating] = useState(0)
  const [feedbackComment, setFeedbackComment] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const emojiScale = [
    { value: 1, emoji: "😡", color: "#C0392B" },
    { value: 2, emoji: "🙁", color: "#D97B4F" },
    { value: 3, emoji: "😐", color: "#D9A441" },
    { value: 4, emoji: "🙂", color: "#4E9A8C" },
    { value: 5, emoji: "🤩", color: "#005F6B" },
  ]

  const handleFeedbackSubmit = () => {
    setFeedbackSubmitted(true)
    setTimeout(() => setFeedbackSubmitted(false), 4000)
  }

  // ---------- Modals ----------
  const [showTransactionHistory, setShowTransactionHistory] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showNeedHelp, setShowNeedHelp] = useState(false)
  const [needHelpOption, setNeedHelpOption] = useState("cannot-see-bill")

  // ---------- Download receipt (no barcode) ----------
  const handleDownloadReceipt = () => {
    const receiptContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Himalaya Wellness Digital Receipt</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Poppins',sans-serif;font-size:14px;color:#1a1a1a;background:#fff;width:800px;margin:0 auto;padding:24px;}
.receipt-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;padding-bottom:16px;border-bottom:3px solid #005F6B;}
.company-info h1{font-size:26px;color:#005F6B;font-weight:700;margin-bottom:4px;}
.company-info p{font-size:12px;color:#555;line-height:1.4;}
.bill-info{text-align:right;font-size:12px;}
.bill-info div{margin-bottom:4px;}
.bill-id{font-weight:600;color:#005F6B;}
.customer-section{background:#F4F1EC;padding:14px;border-left:4px solid #005F6B;border-radius:0 8px 8px 0;margin-bottom:20px;}
.customer-section h3{font-size:15px;color:#005F6B;font-weight:600;margin-bottom:2px;}
.customer-section p{font-size:12px;color:#666;}
.items-table{width:100%;border-collapse:collapse;margin-bottom:20px;}
.items-table th{background:#005F6B;color:white;padding:9px 8px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;}
.items-table td{padding:10px 8px;border-bottom:1px solid #eee;font-size:12px;vertical-align:top;}
.item-name{font-weight:600;margin-bottom:2px;}
.item-meta{font-size:10px;color:#888;}
.totals-table{text-align:right;min-width:220px;margin-left:auto;}
.totals-table div{margin-bottom:6px;font-size:13px;display:flex;justify-content:space-between;gap:24px;}
.net-total{font-size:17px;font-weight:700;color:#005F6B;border-top:2px solid #005F6B;padding-top:6px;margin-top:6px;}
.footer{text-align:center;margin-top:24px;padding-top:16px;border-top:1px dashed #ccc;font-size:12px;color:#555;}
.footer strong{color:#005F6B;}
.powered{margin-top:10px;font-size:10px;color:#003323;font-weight:700;}
@media print{body{-webkit-print-color-adjust:exact;width:100%;padding:0;}}
</style>
</head>
<body>

<div class="receipt-header">
  <div class="company-info">
    <h1>Himalaya Wellness Company</h1>
    <p>Tax Invoice · Since 1930</p>
  </div>
  <div class="bill-info">
    <div><strong>Bill No:</strong> <span class="bill-id">${currentReceipt.id}</span></div>
    <div><strong>Date & Time:</strong> ${currentReceipt.date} ${currentReceipt.time}</div>
    <div><strong>POS:</strong> ${currentReceipt.pos} &nbsp; <strong>Specialist:</strong> ${currentReceipt.brandSpecialist}</div>
  </div>
</div>

<div class="customer-section">
  <h3>Customer: ${currentReceipt.customerName}</h3>
  <p>Mobile No: ${currentReceipt.mobile}</p>
</div>

<table class="items-table">
  <thead>
    <tr>
      <th style="width:40%">Product</th>
      <th style="width:12%">Qty</th>
      <th style="width:16%">Unit Amt</th>
      <th style="width:16%">Discount</th>
      <th style="width:16%">Total Amt</th>
    </tr>
  </thead>
  <tbody>
    ${currentReceipt.items.map(item => `
    <tr>
      <td>
        <div class="item-name">${item.name}</div>
        <div class="item-meta">HSN: ${item.hsnCode} · ${item.size}</div>
      </td>
      <td>${item.qty}</td>
      <td>₹${item.unitAmt.toFixed(2)}</td>
      <td>₹${item.discount.toFixed(2)}</td>
      <td><strong>₹${item.totalAmt.toFixed(2)}</strong></td>
    </tr>`).join('')}
  </tbody>
</table>

<div class="totals-table">
  <div><span>Subtotal</span><span>₹${currentReceipt.subtotal.toFixed(2)}</span></div>
  <div><span>CGST</span><span>₹${currentReceipt.cgst.toFixed(2)}</span></div>
  <div><span>SGST</span><span>₹${currentReceipt.sgst.toFixed(2)}</span></div>
  <div class="net-total"><span>Total Paid</span><span>₹${currentReceipt.total.toFixed(2)}</span></div>
</div>

<div class="footer">
  <p><strong>Thank you for choosing Himalaya Wellness.</strong></p>
  <p>Store Email: contactus@himalayawellness.com &nbsp;|&nbsp; Store Contact: 080-67549111</p>
  <div class="powered">Powered by SmartBill</div>
</div>

</body>
</html>
  `

    const blob = new Blob([receiptContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Himalaya_Receipt_${currentReceipt.id}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const receiptContainerRef = useRef<HTMLDivElement>(null)

  // Auto-height for WordPress iframe
  useEffect(() => {
    const postHeight = () => {
      const marker = document.getElementById("height-marker")
      if (marker && window.parent) {
        const rect = marker.getBoundingClientRect()
        const newHeight = Math.ceil(rect.top + rect.height + window.scrollY)
        window.parent.postMessage({ frameHeight: newHeight }, "*")
      }
    }
    postHeight()
    const ro = new ResizeObserver(postHeight)
    if (receiptContainerRef.current) ro.observe(receiptContainerRef.current)
    window.addEventListener("resize", postHeight)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", postHeight)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F4F1EC] flex justify-center relative">
      <style>{`
        @keyframes barThick { from { width: 0; } to { width: 100%; } }
        @keyframes barThin { from { width: 0; } to { width: 100%; } }
        @keyframes logoFadeIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes splashFadeOut { from { opacity: 1; } to { opacity: 0; visibility: hidden; } }
        .bar-thick { animation: barThick 0.6s ease-out forwards; animation-delay: 0s; width: 0; }
        .bar-thin { animation: barThin 0.6s ease-out forwards; animation-delay: 0.6s; width: 0; }
        .logo-fade { animation: logoFadeIn 0.6s ease-out forwards; animation-delay: 1.3s; opacity: 0; }
        .splash-wrap { animation: splashFadeOut 0.5s ease-in forwards; animation-delay: 2.8s; }
      `}</style>

      <div
        id="receipt-root"
        ref={receiptContainerRef}
        className="w-full max-w-md mx-auto bg-white shadow-lg relative overflow-hidden"
      >
        {/* ---------------- Splash intro overlay ---------------- */}
        {showSplash && (
          <div className="splash-wrap fixed inset-0 z-[9999] bg-[#F4F1EC] flex flex-col items-center max-w-md mx-auto">
            {/* Bars pinned to top */}
            <div className="w-full flex flex-col gap-1.5 mt-12">
              <div className="bar-thick h-4 bg-[#005F6B]" />
              <div className="bar-thin h-2 bg-[#005F6B]" />
            </div>

            {/* Logo appears centered in remaining space, only after bars finish */}
            <div className="flex-1 flex items-center justify-center">
              <div className="logo-fade">
                <Image
                  src="/images/design-mode/himalaya-logo.png"
                  alt="Himalaya Wellness"
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Main content ---------------- */}
        <div className={`flex flex-col w-full transition-opacity duration-500 ${showSplash ? "opacity-0" : "opacity-100"}`}>

          {/* Promo Banner — 1920x650 native ratio, no cropping */}
          <div className="relative w-full aspect-[1920/650] bg-[#F4F1EC] overflow-hidden">
            <Image
              src="/images/design-mode/himalaya-banner-1.png"
              alt="Himalaya Wellness Offer"
              fill
              unoptimized
              className="object-contain"
              priority
            />
          </div>

          {/* Logo Divider — bigger logo, tighter vertical padding */}
          <div className="w-full py-5 flex items-center justify-center bg-[#F4F1EC]">
            <Image
              src="/images/design-mode/himalaya-logo.png"
              alt="Himalaya Wellness"
              width={108}
              height={108}
              className="object-contain"
            />
          </div>

          {/* Feedback Section */}
          <div className="px-4 py-5 bg-white">
            {feedbackSubmitted ? (
              <div className="text-center py-6 bg-green-50 rounded-xl border border-green-100">
                <div className="text-sm font-semibold text-gray-900 mb-1">Thank you for your feedback!</div>
                <div className="text-xs text-gray-500">We appreciate you taking the time to rate us.</div>
              </div>
            ) : (
              <>
                <div className="text-center text-sm font-medium text-gray-800 mb-4">
                  Spill the Love!! Tap a face to rate us
                </div>
                <div className="flex justify-between items-center px-2">
                  {emojiScale.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setRating(item.value)}
                      className="flex flex-col items-center transition-transform active:scale-90"
                    >
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-2xl transition-all"
                        style={{
                          backgroundColor: rating === item.value ? item.color : "#F4F1EC",
                          opacity: rating === 0 || rating === item.value ? 1 : 0.4,
                          transform: rating === item.value ? "scale(1.15)" : "scale(1)",
                        }}
                      >
                        {item.emoji}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-2 px-1">
                  <span>Not Likely at all</span>
                  <span>Extremely Likely</span>
                </div>

                {rating > 0 && (
                  <div className="mt-4 space-y-3">
                    <textarea
                      rows={2}
                      placeholder="Tell us more (optional)"
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#005F6B] focus:border-[#005F6B] outline-none resize-none"
                    />
                    <button
                      onClick={handleFeedbackSubmit}
                      className="w-full bg-[#005F6B] text-white h-10 text-xs font-semibold rounded-xl transition active:scale-[0.98]"
                    >
                      Submit Feedback
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Tax Invoice Card */}
          <div className="px-4 py-5 bg-[#FBFAF7] border-t border-gray-100">
            <div className="text-center mb-4">
              <div className="text-[11px] tracking-[0.2em] text-gray-500 font-medium">TAX INVOICE</div>
              <div className="text-base font-semibold text-gray-900 mt-1">Himalaya Wellness Company</div>
            </div>

            {/* Meta grid */}
            <div className="bg-white rounded-xl border border-gray-200 p-3 grid grid-cols-2 gap-y-2 gap-x-2 text-xs mb-3">
              <div>
                <div className="text-gray-400 text-[10px] uppercase tracking-wide">Date & Time</div>
                <div className="font-medium text-gray-800">{currentReceipt.date} {currentReceipt.time}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-[10px] uppercase tracking-wide">POS</div>
                <div className="font-medium text-gray-800">{currentReceipt.pos}</div>
              </div>
              <div>
                <div className="text-gray-400 text-[10px] uppercase tracking-wide">Bill No</div>
                <div className="font-medium text-gray-800">{currentReceipt.id}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-[10px] uppercase tracking-wide">Brand Specialist</div>
                <div className="font-medium text-gray-800">{currentReceipt.brandSpecialist}</div>
              </div>
            </div>

            {/* Customer grid */}
            <div className="bg-white rounded-xl border border-gray-200 p-3 grid grid-cols-2 gap-y-2 text-xs mb-4">
              <div>
                <div className="text-gray-400 text-[10px] uppercase tracking-wide">Customer Name</div>
                <div className="font-medium text-gray-800">{currentReceipt.customerName}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-[10px] uppercase tracking-wide">Mobile No</div>
                <div className="font-medium text-gray-800">{currentReceipt.mobile}</div>
              </div>
            </div>

            {/* Items — Taco Bell style: QTY over amount on the right, details collapsed */}
            <div className="space-y-2 mb-4">
              {currentReceipt.items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-3">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleItemExpand(item.id)}>
                    <div className="flex items-center flex-1 min-w-0">
                      <ChevronRight className={`h-3.5 w-3.5 mr-2 text-[#005F6B] transition-transform duration-200 shrink-0 ${expandedItems.includes(item.id) ? "rotate-90" : ""}`} />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{item.name}</div>
                        {item.discount > 0 && (
                          <div className="text-[10px] text-[#E67733] font-medium mt-0.5">{item.discountDescription}</div>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-3">
                      <div className="text-[10px] text-gray-400">Qty {item.qty}</div>
                      <div className="text-sm font-semibold text-[#005F6B]">₹{item.totalAmt.toFixed(2)}</div>
                    </div>
                  </div>

                  {expandedItems.includes(item.id) && (
                    <div className="mt-2.5 pt-2.5 border-t border-gray-100 grid grid-cols-2 gap-y-1.5 text-[11px] text-gray-500">
                      <div>HSN Code: {item.hsnCode}</div>
                      <div className="text-right">Size: {item.size}</div>
                      <div>Unit Amt: ₹{item.unitAmt.toFixed(2)}</div>
                      <div className="text-right">Discount: ₹{item.discount.toFixed(2)}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="bg-white rounded-xl border border-gray-200 p-3 space-y-1.5 text-sm mb-3">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>₹{currentReceipt.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">CGST</span><span>₹{currentReceipt.cgst.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">SGST</span><span>₹{currentReceipt.sgst.toFixed(2)}</span></div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
                <span>Total Amount</span><span className="text-[#005F6B]">₹{currentReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border border-gray-200 p-3 flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full border-2 border-[#005F6B] mr-2" />
                <span className="font-medium text-gray-700">Payment Method: Card **** 4532</span>
              </div>
              <span className="font-semibold text-[#005F6B]">₹{currentReceipt.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Barcode — static PNG asset, tight vertical padding, hover-icon suppressed */}
          <div className="py-4 bg-white flex flex-col items-center border-t border-gray-100">
            <div className="relative w-[220px] h-[120px]">
              <Image
                src="/images/design-mode/49681292_9185593.png"
                alt="Bill Barcode"
                fill
                className="object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Store Details — icon top-aligned with first line, left-aligned wrapping text */}
          <div className="px-4 py-5 bg-[#FBFAF7] border-t border-gray-100 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Mail className="h-3.5 w-3.5 text-[#005F6B] shrink-0" />
              <span>contactus@himalayawellness.com</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone className="h-3.5 w-3.5 text-[#005F6B] shrink-0" />
              <span>080-67549111</span>
            </div>
            <div className="flex items-start justify-center gap-1.5 text-xs text-gray-600 max-w-[240px] mx-auto">
              <MapPin className="h-3.5 w-3.5 text-[#005F6B] shrink-0 mt-0.5" />
              <span className="text-left leading-relaxed">Himalaya Wellness Company, Makali, Bengaluru, Karnataka 562123</span>
            </div>
          </div>

          {/* Terms + Need Help row */}
          <div className="px-4 py-4 bg-white border-t border-gray-100 flex justify-center gap-6 text-xs">
            <button onClick={() => setShowTerms(true)} className="flex items-center gap-1.5 text-gray-600 hover:text-[#005F6B] font-medium underline underline-offset-2">
              <FileText className="h-3.5 w-3.5" />
              Terms and Conditions
            </button>
            <button onClick={() => setShowNeedHelp(true)} className="flex items-center gap-1.5 text-gray-600 hover:text-[#005F6B] font-medium underline underline-offset-2">
              <HelpCircle className="h-3.5 w-3.5" />
              Need help? Click here
            </button>
          </div>

          {/* Socials */}
          <div className="px-4 py-5 bg-[#FBFAF7] border-t border-gray-100 flex justify-center gap-5">
            <a href="https://www.facebook.com/HimalayaWellnes/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#005F6B] flex items-center justify-center">
              <Facebook className="h-4 w-4 text-white" />
            </a>
            <a href="https://www.instagram.com/himalayawellnesscompany/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center">
              <Instagram className="h-4 w-4 text-white" />
            </a>
            <a href="https://x.com/himalayaindia" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
              <Twitter className="h-4 w-4 text-white" />
            </a>
            <a href="https://www.youtube.com/channel/UCMCcshjLTRofAIvkE2WWZVQ" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center">
              <Youtube className="h-4 w-4 text-white" />
            </a>
          </div>

          {/* spacer so sticky bottom bar doesn't cover content */}
          <div className="h-16" />
          <div id="height-marker" style={{ height: "1px" }} />
        </div>

        {/* ---------------- Sticky bottom bar ---------------- */}
        {!showSplash && (
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] z-40">
            <div className="flex items-center justify-between px-6 py-2.5">
              <button
                onClick={() => setShowTransactionHistory(true)}
                className="flex flex-col items-center text-gray-600 active:scale-95 transition"
              >
                <History className="h-5 w-5 text-[#005F6B]" />
                <span className="text-[10px] font-medium mt-0.5">History</span>
              </button>

              <div className="flex flex-col items-center leading-none">
                <span className="text-[9px] text-gray-400">Powered by</span>
                <span className="text-xs font-bold" style={{ color: "#003323" }}>SmartBill</span>
              </div>

              <button
                onClick={handleDownloadReceipt}
                className="flex flex-col items-center text-gray-600 active:scale-95 transition"
              >
                <Download className="h-5 w-5 text-[#005F6B]" />
                <span className="text-[10px] font-medium mt-0.5">Download</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------------- Transaction History Modal ---------------- */}
        {showTransactionHistory && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowTransactionHistory(false)} />
            <div className="relative bg-white rounded-2xl w-full max-w-sm mx-4 shadow-2xl border border-gray-200 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-[#005F6B] p-2 rounded-lg mr-3">
                    <History className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">Your Bills</h3>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100" onClick={() => setShowTransactionHistory(false)}>
                  <XIcon className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                {transactionHistory.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentReceiptId(t.id)
                      setShowTransactionHistory(false)
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    className="w-full flex items-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#005F6B] transition"
                  >
                    <div className="bg-white border border-gray-200 p-2 rounded-lg mr-3">
                      <FileText className="h-4 w-4 text-[#005F6B]" />
                    </div>
                    <div className="flex-grow text-left">
                      <div className="text-sm font-semibold text-gray-900">Himalaya Wellness</div>
                      <div className="text-[11px] text-gray-500">{t.date}</div>
                    </div>
                    <div className="text-sm font-semibold text-[#005F6B]">₹{t.amount.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Terms & Conditions Modal ---------------- */}
        {showTerms && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowTerms(false)} />
            <div className="relative bg-white rounded-2xl w-full max-w-sm mx-4 shadow-2xl border border-gray-200 overflow-hidden max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-100 shrink-0">
                <h3 className="text-sm font-semibold text-gray-900 underline underline-offset-2">Exchange & Returns Policy</h3>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100" onClick={() => setShowTerms(false)}>
                  <XIcon className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto text-xs text-gray-600 space-y-2.5 leading-relaxed">
                <p>• Products purchased at Himalaya exclusive stores can be exchanged within 15 days of purchase, along with the original bill copy.</p>
                <p>• The product must be in its original, unused condition and packaging to be considered for exchange.</p>
                <p>• Stores reserve the right to assess the condition of the returned product before approving an exchange.</p>
                <p>• No cash refunds or credit notes will be issued on returned products.</p>
                <p>• A product listed under one invoice can be exchanged only once.</p>
                <p>• Products purchased through the website or other third-party platforms follow their respective return policies.</p>
                <p className="text-[10px] text-gray-400 pt-2 border-t border-gray-100">Placeholder text — replace with Himalaya's final legal copy before going live.</p>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Need Help Modal ---------------- */}
        {showNeedHelp && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowNeedHelp(false)} />
            <div className="relative bg-white rounded-2xl w-full max-w-sm mx-4 shadow-2xl border border-gray-200 overflow-hidden">
              <div className="flex flex-col items-center pt-6 pb-2">
                <HelpCircle className="h-9 w-9 text-[#005F6B]" />
              </div>
              <div className="px-5 pb-4 space-y-1">
                {[
                  { id: "cannot-see-bill", label: "I cannot see my bill" },
                  { id: "not-my-bill", label: "This is not my bill" },
                  { id: "mistakes", label: "There are mistakes in the bill" },
                  { id: "store-feedback", label: "I want to give feedback to the store" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setNeedHelpOption(opt.id)}
                    className="w-full flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0 text-left"
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${needHelpOption === opt.id ? "border-[#005F6B]" : "border-gray-300"}`}>
                      {needHelpOption === opt.id && <div className="w-2 h-2 rounded-full bg-[#005F6B]" />}
                    </div>
                    <span className="text-sm text-gray-800">{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex border-t border-gray-100">
                <button onClick={() => setShowNeedHelp(false)} className="flex-1 py-3 text-sm font-medium text-gray-500">
                  Cancel
                </button>
                <button
                  onClick={() => setShowNeedHelp(false)}
                  className="flex-1 py-3 text-sm font-semibold text-white bg-[#005F6B]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
