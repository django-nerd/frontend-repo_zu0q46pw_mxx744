import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, CircuitBoard, Zap, PlayCircle, ArrowRight, ShieldCheck, Image as ImageIcon } from 'lucide-react'
import Spline from '@splinetool/react-spline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const [signedIn, setSignedIn] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [showSigninPrompt, setShowSigninPrompt] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleGenerate = (e) => {
    e.preventDefault()
    if (!signedIn) {
      setShowSigninPrompt(true)
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      alert('Ziro is generating your circuit from:\n\n' + prompt)
    }, 900)
  }

  const featurePillars = useMemo(() => ([
    {
      icon: <Cpu className="w-5 h-5 text-teal-300" />, title: 'AI-generated circuits',
      desc: 'Describe your intent in natural language. Ziro maps it to components, constraints, and electrical rules.'
    },
    {
      icon: <CircuitBoard className="w-5 h-5 text-indigo-300" />, title: 'Auto placement & routing',
      desc: 'Optimized layout and trace routing in seconds with intelligent DRC and net awareness.'
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-300" />, title: 'Instant simulation',
      desc: 'One-click transient, AC, and DC sweeps with realistic device models and param sweeps.'
    },
  ]), [])

  const howItWorks = useMemo(() => ([
    { step: '1', title: 'Describe', desc: 'Type a goal like “5V buck converter 2A, 92% efficiency, low ripple.”' },
    { step: '2', title: 'Generate', desc: 'Ziro compiles it into a schematic, places components, and routes automatically.' },
    { step: '3', title: 'Simulate', desc: 'Run quick sims, iterate, and export results or share with your team.' },
  ]), [])

  const gallery = useMemo(() => ([
    { title: 'Class-D Audio Amp', tag: 'Analog + Power' },
    { title: 'BLE Sensor Node', tag: 'RF + MCU' },
    { title: 'USB-C PD Sink', tag: 'Power' },
    { title: 'LoRa Tracker', tag: 'RF + Power' },
    { title: 'Buck Converter 5V→3.3V', tag: 'Power' },
    { title: 'Op-Amp Instrumentation', tag: 'Analog' },
  ]), [])

  return (
    <div className="min-h-screen w-full bg-[#0A0B0E] text-white">
      {/* Top gradient accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-gradient-to-br from-teal-500/20 to-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-16 h-96 w-96 rounded-full bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 blur-3xl" />
      </div>

      {/* Navigation */}
      <header className="relative z-20">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-teal-400 to-indigo-500 shadow-lg shadow-indigo-500/30" />
            <span className="text-lg font-semibold tracking-wide">Ziro</span>
          </div>
          <div className="flex items-center gap-3">
            {signedIn ? (
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-teal-500 to-indigo-500" />
                <span>Signed in</span>
                <button onClick={() => setSignedIn(false)} className="text-zinc-400 hover:text-zinc-200 underline decoration-dotted">Sign out</button>
              </div>
            ) : (
              <button onClick={() => setSignedIn(true)} className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:border-white/20 hover:bg-white/10">
                <span className="i-google-logo" aria-hidden />
                <span>Sign in with Google</span>
                <ArrowRight className="ml-1 h-4 w-4 opacity-60 transition group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pt-6 pb-10 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-[700] tracking-tight leading-[1.05]"
              >
                Design electronic circuits with AI.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-indigo-300 to-sky-300">Meet Ziro – your circuit co-designer.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-5 text-zinc-300 text-lg"
              >
                Go from plain English to simulated, ready-to-review circuits. Ziro handles component selection, placement, routing, and instant simulation.
              </motion.p>

              <motion.form
                onSubmit={handleGenerate}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-7"
              >
                <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
                  <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe a circuit… e.g. ‘3.3V 1A buck converter, <15mV ripple, small form factor’"
                    className="w-full bg-transparent px-4 py-4 text-base outline-none placeholder:text-zinc-500"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className={classNames(
                      'inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 px-4 py-3 text-sm font-semibold shadow-lg shadow-indigo-500/20 transition',
                      'hover:brightness-110 active:scale-[.98] disabled:opacity-60'
                    )}
                  >
                    <PlayCircle className="h-5 w-5" />
                    {submitting ? 'Generating…' : 'Generate'}
                  </button>
                </div>
                {!signedIn && (
                  <p className="mt-2 text-xs text-zinc-400">You’ll be asked to sign in before generating.</p>
                )}
              </motion.form>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {featurePillars.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center gap-2">
                      {f.icon}
                      <h3 className="text-sm font-semibold">{f.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 3D Hero Visual */}
            <div className="order-1 lg:order-2 relative h-[360px] sm:h-[420px] md:h-[520px] lg:h-[560px] xl:h-[600px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
              <Spline scene="https://prod.spline.design/FduaNp3csZktbOi3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold">How it works</h2>
            <p className="mt-2 text-zinc-400">From intent → schematic → layout → simulation in minutes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {howItWorks.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6"
              >
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-zinc-200">{s.step}</div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative z-10 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Example circuits</h2>
              <p className="mt-2 text-zinc-400">A taste of what Ziro can synthesize.</p>
            </div>
            <button className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
              <ImageIcon className="h-4 w-4" /> View all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gallery.map((g, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(130deg,rgba(255,255,255,.06),rgba(255,255,255,.02))] p-5"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-400/10 via-indigo-400/5 to-cyan-400/10 opacity-0 transition group-hover:opacity-100 pointer-events-none" />
                <div className="h-36 w-full rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900/60 mb-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{g.title}</h3>
                    <p className="text-xs text-zinc-400">{g.tag}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-zinc-400 group-hover:text-white transition" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className="relative z-10 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold">Design modes</h2>
            <p className="mt-2 text-zinc-400">Choose the generation style that fits your flow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="relative rounded-2xl border border-teal-400/30 bg-gradient-to-br from-teal-500/10 to-indigo-500/10 p-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3 py-1 text-xs text-teal-200">Available</div>
              <h3 className="text-xl font-semibold">Flux Forge (Core)</h3>
              <p className="mt-2 text-sm text-zinc-300">Directly translate text or pseudocode into optimized circuits with AI placement, routing, and instant simulation.</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
                <ShieldCheck className="h-4 w-4 text-teal-300" /> DRC checks • Net awareness • Exports
              </div>
            </div>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 opacity-70">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-200">Coming soon</div>
              <h3 className="text-xl font-semibold">Schematic + PCB</h3>
              <p className="mt-2 text-sm text-zinc-300">Interactive dual-view editing with synchronized net updates and BOM export.</p>
            </div>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 opacity-70">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-200">Coming soon</div>
              <h3 className="text-xl font-semibold">IC / Chip Design</h3>
              <p className="mt-2 text-sm text-zinc-300">Concept-to-layout flows inspired by advanced EDA stacks, for exploratory silicon design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-md bg-gradient-to-br from-teal-400 to-indigo-500" />
                <span className="font-semibold">Ziro</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">AI Electronic Circuit Designer</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-zinc-400">
              <a className="hover:text-white" href="#">Privacy</a>
              <a className="hover:text-white" href="#">Terms</a>
              <a className="hover:text-white" href="#">Status</a>
            </div>
          </div>
          <p className="mt-6 text-xs text-zinc-500">© {new Date().getFullYear()} Ziro. All rights reserved.</p>
        </div>
      </footer>

      {/* Sign-in Prompt Modal */}
      {showSigninPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSigninPrompt(false)} />
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-[92%] max-w-md rounded-2xl border border-white/10 bg-[#0C0D12] p-6 shadow-2xl">
            <h3 className="text-lg font-semibold">Sign in to generate</h3>
            <p className="mt-2 text-sm text-zinc-400">Create a free account to generate circuits and save your work.</p>
            <div className="mt-5 flex items-center gap-3">
              <button onClick={() => { setSignedIn(true); setShowSigninPrompt(false) }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 px-4 py-3 text-sm font-semibold">
                Continue with Google
              </button>
              <button onClick={() => setShowSigninPrompt(false)} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-300 hover:bg-white/5">Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
