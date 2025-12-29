import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Layers,
  BookOpen,
  Timer,
} from "lucide-react";

// --- CNS Biochemistry Data (100 Questions) ---
const CNS_BIOCHEMISTRY_DECK = {
  id: "cns-1",
  title: "CNS Biochemistry",
  description:
    "Interactive MCQ session covering brain metabolism and neurotransmitters.",
  cards: [
    {
      id: "1",
      front:
        "In the fed state, what is the primary fuel for the brain?\n\nA) Fatty acids\nB) Ketone bodies\nC) Glucose\nD) Amino acids\nE) Lactate",
      back: "Answer: C) Glucose",
    },
    {
      id: "2",
      front:
        "Which glucose transporter is primarily responsible for glucose uptake into brain cells?\n\nA) GLUT1\nB) GLUT2\nC) GLUT3\nD) GLUT4\nE) SGLT1",
      back: "Answer: C) GLUT3",
    },
    {
      id: "3",
      front:
        "Why are fatty acids NOT used as fuel by the brain?\n\nA) They are too large to cross the blood-brain barrier\nB) They are bound to albumin in plasma\nC) Brain cells lack the enzymes to oxidize fatty acids\nD) Fatty acids are toxic to neurons\nE) They are converted to ketones first",
      back: "Answer: B) They are bound to albumin in plasma",
    },
    {
      id: "4",
      front:
        "Approximately what percentage of the body’s glucose is consumed by the brain in the resting state?\n\nA) 20%\nB) 40%\nC) 60%\nD) 80%\nE) 100%",
      back: "Answer: C) 60%",
    },
    {
      id: "5",
      front:
        "What percentage of brain energy is used to maintain the Na+-K+ membrane potential?\n\nA) 20–30%\nB) 40–50%\nC) 60–70%\nD) 80–90%\nE) 100%",
      back: "Answer: C) 60–70%",
    },
    {
      id: "6",
      front:
        "At what plasma glucose level does brain glucose oxidation begin to slow significantly?\n\nA) 70 mg/dL\nB) 60 mg/dL\nC) 50 mg/dL\nD) 40 mg/dL\nE) 30 mg/dL",
      back: "Answer: D) 40 mg/dL",
    },
    {
      id: "7",
      front:
        "Which of the following is NOT recommended for maintaining healthy brain blood flow?\n\nA) High cholesterol diet\nB) Regular exercise\nC) Controlling blood pressure\nD) Balanced diet\nE) Managing diabetes",
      back: "Answer: A) High cholesterol diet",
    },
    {
      id: "8",
      front:
        "How long does it typically take for the metabolic switch from glucose to ketones to occur during fasting?\n\nA) 2–4 hours\nB) 5–8 hours\nC) 10–14 hours\nD) 18–24 hours\nE) 48 hours",
      back: "Answer: C) 10–14 hours",
    },
    {
      id: "9",
      front:
        "Which hormone increases during fasting to stimulate fuel release?\n\nA) Insulin\nB) Glucagon\nC) Leptin\nD) Ghrelin\nE) Cortisol",
      back: "Answer: B) Glucagon",
    },
    {
      id: "10",
      front:
        "During early fasting, blood glucose is maintained primarily by:\n\nA) Gluconeogenesis\nB) Glycogenolysis\nC) Lipolysis\nD) Proteolysis\nE) Ketogenesis",
      back: "Answer: B) Glycogenolysis",
    },
    {
      id: "11",
      front:
        "Which tissue primarily uses fatty acids for energy during fasting?\n\nA) Brain\nB) Red blood cells\nC) Liver\nD) Muscle\nE) All of the above",
      back: "Answer: D) Muscle",
    },
    {
      id: "12",
      front:
        "Ketone bodies are produced in the:\n\nA) Brain\nB) Muscle\nC) Liver\nD) Adipose tissue\nE) Kidneys",
      back: "Answer: C) Liver",
    },
    {
      id: "13",
      front:
        "During prolonged fasting (>2–3 weeks), what happens to brain fuel use?\n\nA) It uses only glucose\nB) It uses only fatty acids\nC) It uses ketones, reducing glucose demand\nD) It stops using ketones\nE) It relies solely on amino acids",
      back: "Answer: C) It uses ketones, reducing glucose demand",
    },
    {
      id: "14",
      front:
        "Which of the following is a source for gluconeogenesis during fasting?\n\nA) Glycerol\nB) Fatty acids\nC) Ketone bodies\nD) Glycogen\nE) Lactate only",
      back: "Answer: A) Glycerol",
    },
    {
      id: "15",
      front:
        "What is released by muscle during fasting to support gluconeogenesis?\n\nA) Fatty acids\nB) Ketones\nC) Glucose\nD) Amino acids\nE) Glycerol",
      back: "Answer: D) Amino acids",
    },
    {
      id: "16",
      front:
        "Which protein is stimulated by fasting and exercise and supports neuron growth and stress resistance?\n\nA) Insulin\nB) Glucagon\nC) BDNF\nD) Tau protein\nE) Amyloid beta",
      back: "Answer: C) BDNF",
    },
    {
      id: "17",
      front:
        "What cellular process is triggered by fasting to remove damaged components?\n\nA) Apoptosis\nB) Necrosis\nC) Autophagy\nD) Phagocytosis\nE) Mitophagy",
      back: "Answer: C) Autophagy",
    },
    {
      id: "18",
      front:
        "Which of the following is a documented benefit of fasting in lab animals?\n\nA) Decreased memory\nB) Increased cognitive function\nC) Reduced neuron growth\nD) Decreased stress resistance\nE) Impaired learning",
      back: "Answer: B) Increased cognitive function",
    },
    {
      id: "19",
      front:
        "What is the junction between two nerve cells called?\n\nA) Node of Ranvier\nB) Synapse\nC) Dendrite\nD) Axon terminal\nE) Soma",
      back: "Answer: B) Synapse",
    },
    {
      id: "20",
      front:
        "Where are neurotransmitters stored before release?\n\nA) Nucleus\nB) Mitochondria\nC) Synaptic vesicles\nD) Endoplasmic reticulum\nE) Golgi apparatus",
      back: "Answer: C) Synaptic vesicles",
    },
    {
      id: "21",
      front:
        "Dale’s Law originally stated that:\n\nA) Neurons release multiple neurotransmitters\nB) Each neuron releases only one neurotransmitter\nC) Neurotransmitters are only excitatory\nD) Synapses are electrical only\nE) Glia release neurotransmitters",
      back: "Answer: B) Each neuron releases only one neurotransmitter",
    },
    {
      id: "22",
      front:
        "Which of the following is a class of neurotransmitters?\n\nA) Carbohydrates\nB) Lipids\nC) Amino acids\nD) Nucleic acids\nE) All of the above",
      back: "Answer: C) Amino acids",
    },
    {
      id: "23",
      front:
        "Approximately how many neurotransmitters have been identified in the human brain?\n\nA) 10\nB) 50\nC) >100\nD) 200\nE) 500",
      back: "Answer: C) >100",
    },
    {
      id: "24",
      front:
        "Which neurotransmitter is primarily involved in muscle contraction and cognitive functions like attention and memory?\n\nA) Dopamine\nB) Serotonin\nC) Acetylcholine\nD) GABA\nE) Glutamate",
      back: "Answer: C) Acetylcholine",
    },
    {
      id: "25",
      front:
        "Where are acetylcholine-producing cells primarily located?\n\nA) Hippocampus\nB) Basal forebrain nuclei\nC) Substantia nigra\nD) Locus coeruleus\nE) Cerebellum",
      back: "Answer: B) Basal forebrain nuclei",
    },
    {
      id: "26",
      front:
        "Which nucleus is part of the basal forebrain cholinergic system?\n\nA) Substantia nigra\nB) Nucleus basalis of Meynert\nC) Ventral tegmental area\nD) Locus coeruleus\nE) Arcuate nucleus",
      back: "Answer: B) Nucleus basalis of Meynert",
    },
    {
      id: "27",
      front:
        "Dopamine is often referred to as the:\n\nA) Calming chemical\nB) Pleasure chemical\nC) Learning chemical\nD) Excitatory chemical\nE) Stress chemical",
      back: "Answer: B) Pleasure chemical",
    },
    {
      id: "28",
      front:
        "Which of the following is NOT a role of dopamine?\n\nA) Motivation\nB) Movement\nC) Decision-making\nD) Long-term memory consolidation\nE) Attention",
      back: "Answer: D) Long-term memory consolidation",
    },
    {
      id: "29",
      front:
        "Parkinson’s disease is primarily associated with the loss of dopamine-producing neurons in the:\n\nA) Hippocampus\nB) Substantia nigra\nC) Locus coeruleus\nD) Amygdala\nE) Thalamus",
      back: "Answer: B) Substantia nigra",
    },
    {
      id: "30",
      front:
        "Which dopaminergic pathway is involved in reward and motivation?\n\nA) Nigrostriatal\nB) Mesolimbic\nC) Mesocortical\nD) Tuberoinfundibular\nE) All of the above",
      back: "Answer: B) Mesolimbic",
    },
    {
      id: "31",
      front:
        "Glutamate is the brain’s primary:\n\nA) Inhibitory neurotransmitter\nB) Excitatory neurotransmitter\nC) Neuromodulator\nD) Hormone\nE) Peptide neurotransmitter",
      back: "Answer: B) Excitatory neurotransmitter",
    },
    {
      id: "32",
      front:
        "Excess glutamate can lead to:\n\nA) Increased learning\nB) Synaptic plasticity\nC) Excitotoxicity\nD) Enhanced memory\nE) Neuroprotection",
      back: "Answer: C) Excitotoxicity",
    },
    {
      id: "33",
      front:
        "Synaptic plasticity is crucial for:\n\nA) Muscle contraction\nB) Learning and memory\nC) Sleep regulation\nD) Stress response\nE) Appetite control",
      back: "Answer: B) Learning and memory",
    },
    {
      id: "34",
      front:
        "Serotonin is primarily involved in:\n\nA) Movement coordination\nB) Mood stabilization and well-being\nC) Excitatory signaling\nD) Pain perception only\nE) Glucose metabolism",
      back: "Answer: B) Mood stabilization and well-being",
    },
    {
      id: "35",
      front:
        "Low levels of serotonin are linked to:\n\nA) Parkinson’s disease\nB) Alzheimer’s disease\nC) Depression\nD) Huntington’s disease\nE) Multiple sclerosis",
      back: "Answer: C) Depression",
    },
    {
      id: "36",
      front:
        "Which of the following is influenced by serotonin?\n\nA) Appetite\nB) Sleep\nC) Memory\nD) All of the above\nE) None of the above",
      back: "Answer: D) All of the above",
    },
    {
      id: "37",
      front:
        "Norepinephrine is both a neurotransmitter and a:\n\nA) Enzyme\nB) Hormone\nC) Structural protein\nD) Receptor\nE) Second messenger",
      back: "Answer: B) Hormone",
    },
    {
      id: "38",
      front:
        "The main neurotransmitter of the sympathetic nervous system is:\n\nA) Acetylcholine\nB) Dopamine\nC) Serotonin\nD) Norepinephrine\nE) GABA",
      back: "Answer: D) Norepinephrine",
    },
    {
      id: "39",
      front:
        "Norepinephrine-producing neurons are primarily located in the:\n\nA) Hippocampus\nB) Locus coeruleus\nC) Basal ganglia\nD) Cerebellum\nE) Hypothalamus",
      back: "Answer: B) Locus coeruleus",
    },
    {
      id: "40",
      front:
        "Which system is involved in emotions, memory, and arousal?\n\nA) Limbic system\nB) Basal ganglia\nC) Reticular formation\nD) Cerebellum\nE) Brainstem",
      back: "Answer: A) Limbic system",
    },
    {
      id: "41",
      front:
        "Norepinephrine is involved in all EXCEPT:\n\nA) Arousal\nB) Vigilance\nC) Mood\nD) Digestion\nE) Stress response",
      back: "Answer: D) Digestion",
    },
    {
      id: "42",
      front:
        "GABA is synthesized from:\n\nA) Glutamate\nB) Dopamine\nC) Serotonin\nD) Glycine\nE) Acetylcholine",
      back: "Answer: A) Glutamate",
    },
    {
      id: "43",
      front:
        "The enzyme that converts glutamate to GABA is:\n\nA) Glutamate dehydrogenase\nB) Glutamic acid decarboxylase (GAD)\nC) GABA transaminase\nD) Monoamine oxidase\nE) Tyrosine hydroxylase",
      back: "Answer: B) Glutamic acid decarboxylase (GAD)",
    },
    {
      id: "44",
      front:
        "GABA is the brain’s primary:\n\nA) Excitatory neurotransmitter\nB) Inhibitory neurotransmitter\nC) Neuromodulator\nD) Hormone\nE) Peptide",
      back: "Answer: B) Inhibitory neurotransmitter",
    },
    {
      id: "45",
      front:
        "GABA helps promote sleep by:\n\nA) Stimulating wake-promoting regions\nB) Inhibiting wake-promoting regions\nC) Increasing glutamate release\nD) Enhancing dopamine activity\nE) Blocking serotonin receptors",
      back: "Answer: B) Inhibiting wake-promoting regions",
    },
    {
      id: "46",
      front:
        "GABA is important for:\n\nA) Fine-tuning neural firing\nB) Initiating muscle contraction\nC) Increasing heart rate\nD) Enhancing excitotoxicity\nE) Breaking down amyloid plaques",
      back: "Answer: A) Fine-tuning neural firing",
    },
    {
      id: "47",
      front:
        "Oxytocin and vasopressin are produced in the:\n\nA) Pituitary gland\nB) Hypothalamus\nC) Adrenal gland\nD) Pineal gland\nE) Thyroid gland",
      back: "Answer: B) Hypothalamus",
    },
    {
      id: "48",
      front:
        "How do hormones differ from neurotransmitters?\n\nA) Hormones are released into synapses\nB) Neurotransmitters are released into the bloodstream\nC) Hormones are transmitted through blood\nD) Neurotransmitters act only locally\nE) Both C and D",
      back: "Answer: E) Both C and D",
    },
    {
      id: "49",
      front:
        "Which of the following can also act as neurotransmitters?\n\nA) Estrogen and testosterone\nB) Insulin and glucagon\nC) Cortisol and aldosterone\nD) Thyroxine and calcitonin\nE) All of the above",
      back: "Answer: A) Estrogen and testosterone",
    },
    {
      id: "50",
      front:
        "Testosterone increases levels of:\n\nA) GABA\nB) Growth hormone\nC) Insulin\nD) Glucagon\nE) Cortisol",
      back: "Answer: B) Growth hormone",
    },
    {
      id: "51",
      front:
        "Which neurotransmitter is considered a “co-transmitter” that works with others?\n\nA) Enkephalin\nB) Dopamine\nC) Acetylcholine\nD) Glutamate\nE) Serotonin",
      back: "Answer: A) Enkephalin",
    },
    {
      id: "52",
      front:
        "Which of the following is involved in the brain’s stress response?\n\nA) CRH\nB) Endorphins\nC) NPY\nD) All of the above\nE) None of the above",
      back: "Answer: D) All of the above",
    },
    {
      id: "53",
      front:
        "Glia cells that release neurotransmitters are called:\n\nA) Microglia\nB) Astrocytes\nC) Oligodendrocytes\nD) Schwann cells\nE) Ependymal cells",
      back: "Answer: B) Astrocytes",
    },
    {
      id: "54",
      front:
        "Astrocytes release which of the following as gliotransmitters?\n\nA) Glutamate\nB) ATP\nC) Adenosine\nD) D-serine\nE) All of the above",
      back: "Answer: E) All of the above",
    },
    {
      id: "55",
      front:
        "Which of the following is TRUE about the brain in the fed state?\n\nA) It uses ketones as primary fuel\nB) It stores large amounts of glycogen\nC) It consumes about 60% of the body’s glucose\nD) Fatty acids are the main energy source\nE) It does not require continuous glucose supply",
      back: "Answer: C) It consumes about 60% of the body’s glucose",
    },
    {
      id: "56",
      front:
        "What happens to insulin and glucagon levels during fasting?\n\nA) Both increase\nB) Both decrease\nC) Insulin increases, glucagon decreases\nD) Insulin decreases, glucagon increases\nE) Both remain unchanged",
      back: "Answer: D) Insulin decreases, glucagon increases",
    },
    {
      id: "57",
      front:
        "During prolonged fasting, the brain uses ketones to spare:\n\nA) Muscle protein\nB) Adipose tissue\nC) Liver glycogen\nD) Bone marrow\nE) Red blood cells",
      back: "Answer: A) Muscle protein",
    },
    {
      id: "58",
      front:
        "Which of the following is NOT a benefit of fasting in lab animals?\n\nA) Increased BDNF\nB) Enhanced autophagy\nC) Improved learning and memory\nD) Decreased neuron resistance to stress\nE) Better physical endurance",
      back: "Answer: D) Decreased neuron resistance to stress",
    },
    {
      id: "59",
      front:
        "What is the role of BDNF in the brain?\n\nA) Promotes neuron survival and growth\nB) Breaks down amyloid plaques\nC) Inhibits neurotransmitter release\nD) Increases blood glucose\nE) Enhances fatty acid oxidation",
      back: "Answer: A) Promotes neuron survival and growth",
    },
    {
      id: "60",
      front:
        "Autophagy during fasting helps cells:\n\nA) Grow larger\nB) Remove damaged components\nC) Increase protein synthesis\nD) Store more fat\nE) Divide more rapidly",
      back: "Answer: B) Remove damaged components",
    },
    {
      id: "61",
      front:
        "Which of the following is a monoamine neurotransmitter?\n\nA) Glutamate\nB) GABA\nC) Dopamine\nD) Glycine\nE) Aspartate",
      back: "Answer: C) Dopamine",
    },
    {
      id: "62",
      front:
        "Peptide neurotransmitters include:\n\nA) Endorphins\nB) Enkephalins\nC) Dynorphins\nD) All of the above\nE) None of the above",
      back: "Answer: D) All of the above",
    },
    {
      id: "63",
      front:
        "Which neurotransmitter is crucial for translating movement intentions into action?\n\nA) Serotonin\nB) Acetylcholine\nC) Norepinephrine\nD) GABA\nE) Glutamate",
      back: "Answer: B) Acetylcholine",
    },
    {
      id: "64",
      front:
        "The striatum is part of the:\n\nA) Basal ganglia\nB) Limbic system\nC) Brainstem\nD) Cerebellum\nE) Cortex",
      back: "Answer: A) Basal ganglia",
    },
    {
      id: "65",
      front:
        "Which pathway is involved in motor control and is affected in Parkinson’s disease?\n\nA) Mesolimbic pathway\nB) Mesocortical pathway\nC) Nigrostriatal pathway\nD) Tuberoinfundibular pathway\nE) Retinohypothalamic pathway",
      back: "Answer: C) Nigrostriatal pathway",
    },
    {
      id: "66",
      front:
        "What is the effect of high concentrations of glutamate?\n\nA) Enhanced learning\nB) Neuroprotection\nC) Excitotoxicity and neuron death\nD) Increased GABA synthesis\nE) Improved memory consolidation",
      back: "Answer: C) Excitotoxicity and neuron death",
    },
    {
      id: "67",
      front:
        "Which neurotransmitter is derived from tryptophan?\n\nA) Dopamine\nB) Norepinephrine\nC) Serotonin\nD) Acetylcholine\nE) GABA",
      back: "Answer: C) Serotonin",
    },
    {
      id: "68",
      front:
        "Which neurotransmitter is involved in vigilance and wakefulness?\n\nA) GABA\nB) Serotonin\nC) Norepinephrine\nD) Acetylcholine\nE) Dopamine",
      back: "Answer: C) Norepinephrine",
    },
    {
      id: "69",
      front:
        "GABA’s role in sleep is to:\n\nA) Promote REM sleep\nB) Inhibit wake-promoting regions\nC) Stimulate the reticular activating system\nD) Increase dopamine release\nE) Enhance glutamate activity",
      back: "Answer: B) Inhibit wake-promoting regions",
    },
    {
      id: "70",
      front:
        "Which of the following is a hypothalamic neuropeptide involved in pair-bonding?\n\nA) Dopamine\nB) Oxytocin\nC) Serotonin\nD) Glutamate\nE) GABA",
      back: "Answer: B) Oxytocin",
    },
    {
      id: "71",
      front:
        "Hormones differ from neurotransmitters in that hormones:\n\nA) Act only locally\nB) Are released into synapses\nC) Are transmitted through the bloodstream\nD) Are always proteins\nE) Cannot affect the brain",
      back: "Answer: C) Are transmitted through the bloodstream",
    },
    {
      id: "72",
      front:
        "Which of the following is released alongside glutamate to signal eating behavior?\n\nA) Enkephalin\nB) Endorphin\nC) Dynorphin\nD) NPY\nE) CRH",
      back: "Answer: A) Enkephalin",
    },
    {
      id: "73",
      front:
        "Astrocytes participate in synaptic transmission by releasing:\n\nA) Gliotransmitters\nB) Hormones\nC) Enzymes\nD) Only glutamate\nE) Only ATP",
      back: "Answer: A) Gliotransmitters",
    },
    {
      id: "74",
      front:
        "Which of the following is NOT a catecholamine?\n\nA) Dopamine\nB) Norepinephrine\nC) Epinephrine\nD) Serotonin\nE) All are catecholamines",
      back: "Answer: D) Serotonin",
    },
    {
      id: "75",
      front:
        "The “learning chemical” neurotransmitter is:\n\nA) Glutamate\nB) GABA\nC) Acetylcholine\nD) Dopamine\nE) Serotonin",
      back: "Answer: B) GABA",
    },
    {
      id: "76",
      front:
        "Which neurotransmitter is synthesized from tyrosine?\n\nA) Serotonin\nB) GABA\nC) Acetylcholine\nD) Dopamine\nE) Glutamate",
      back: "Answer: D) Dopamine",
    },
    {
      id: "77",
      front:
        "The metabolic switch in fasting is accelerated by:\n\nA) Sleep\nB) Exercise\nC) High-carb meals\nD) Stress\nE) Cold exposure",
      back: "Answer: B) Exercise",
    },
    {
      id: "78",
      front:
        "In fasting, glycerol is used for:\n\nA) Ketogenesis\nB) Gluconeogenesis\nC) Glycogen synthesis\nD) Fatty acid synthesis\nE) Protein synthesis",
      back: "Answer: B) Gluconeogenesis",
    },
    {
      id: "79",
      front:
        "Which of the following is TRUE about ketone bodies?\n\nA) They are produced in muscles\nB) They cannot cross the blood-brain barrier\nC) They are used by the brain during prolonged fasting\nD) They increase glucose demand\nE) They are primarily excreted in urine",
      back: "Answer: C) They are used by the brain during prolonged fasting",
    },
    {
      id: "80",
      front:
        "Which brain region is part of the limbic system and involved in memory?\n\nA) Substantia nigra\nB) Hippocampus\nC) Cerebellum\nD) Pons\nE) Medulla",
      back: "Answer: B) Hippocampus",
    },
    {
      id: "81",
      front:
        "Which neurotransmitter is associated with schizophrenia when dysregulated?\n\nA) GABA\nB) Acetylcholine\nC) Dopamine\nD) Serotonin\nE) Glutamate",
      back: "Answer: C) Dopamine",
    },
    {
      id: "82",
      front:
        "The “calming chemical” neurotransmitter is:\n\nA) Dopamine\nB) Serotonin\nC) Norepinephrine\nD) Glutamate\nE) Acetylcholine",
      back: "Answer: B) Serotonin",
    },
    {
      id: "83",
      front:
        "Which of the following is an inhibitory amino acid neurotransmitter?\n\nA) Glutamate\nB) Aspartate\nC) Glycine\nD) D-serine\nE) All are excitatory",
      back: "Answer: C) Glycine",
    },
    {
      id: "84",
      front:
        "Neurotransmitter release is triggered by:\n\nA) Influx of Ca²⁺ into the presynaptic terminal\nB) Efflux of K⁺ from the presynaptic terminal\nC) Influx of Na⁺ into the postsynaptic neuron\nD) Release of Mg²⁺ from vesicles\nE) Activation of adenylate cyclase",
      back: "Answer: A) Influx of Ca²⁺ into the presynaptic terminal",
    },
    {
      id: "85",
      front:
        "Which of the following is a neuromodulator?\n\nA) Dopamine\nB) Serotonin\nC) Acetylcholine\nD) Norepinephrine\nE) All of the above",
      back: "Answer: E) All of the above",
    },
    {
      id: "86",
      front:
        "The mesocortical dopamine pathway is involved in:\n\nA) Motor control\nB) Reward and emotion\nC) Executive function and cognition\nD) Hormone regulation\nE) Sleep-wake cycles",
      back: "Answer: C) Executive function and cognition",
    },
    {
      id: "87",
      front:
        "Which enzyme breaks down acetylcholine in the synapse?\n\nA) Monoamine oxidase\nB) Catechol-O-methyltransferase\nC) Acetylcholinesterase\nD) Glutamate decarboxylase\nE) Tyrosine hydroxylase",
      back: "Answer: C) Acetylcholinesterase",
    },
    {
      id: "88",
      front:
        "The primary source of serotonin in the brain is the:\n\nA) Locus coeruleus\nB) Raphe nuclei\nC) Substantia nigra\nD) Basal forebrain\nE) Ventral tegmental area",
      back: "Answer: B) Raphe nuclei",
    },
    {
      id: "89",
      front:
        "Which neurotransmitter is implicated in anxiety disorders when deficient?\n\nA) GABA\nB) Glutamate\nC) Dopamine\nD) Acetylcholine\nE) Norepinephrine",
      back: "Answer: A) GABA",
    },
    {
      id: "90",
      front:
        "What is the final product of dopamine metabolism by MAO and COMT?\n\nA) Homovanillic acid (HVA)\nB) 5-HIAA\nC) VMA\nD) MHPG\nE) DOPAC",
      back: "Answer: A) Homovanillic acid (HVA)",
    },
    {
      id: "91",
      front:
        "Which of the following is NOT a function of acetylcholine?\n\nA) Muscle contraction\nB) Attention\nC) Memory\nD) Pain modulation\nE) Sleep promotion",
      back: "Answer: E) Sleep promotion",
    },
    {
      id: "92",
      front:
        "The neurotransmitter histamine is derived from:\n\nA) Tyrosine\nB) Tryptophan\nC) Histidine\nD) Glutamate\nE) Aspartate",
      back: "Answer: C) Histidine",
    },
    {
      id: "93",
      front:
        "Which of the following is TRUE about GABA receptors?\n\nA) They are ionotropic only\nB) They are metabotropic only\nC) They include both ionotropic (GABA-A) and metabotropic (GABA-B) types\nD) They are excitatory\nE) They are only found in the spinal cord",
      back: "Answer: C) They include both ionotropic (GABA-A) and metabotropic (GABA-B) types",
    },
    {
      id: "94",
      front:
        "Neuropeptide Y (NPY) is involved in:\n\nA) Stimulating appetite\nB) Reducing anxiety\nC) Stress response\nD) All of the above\nE) None of the above",
      back: "Answer: D) All of the above",
    },
    {
      id: "95",
      front:
        "Which glial cell type is primarily responsible for neurotransmitter reuptake?\n\nA) Astrocytes\nB) Microglia\nC) Oligodendrocytes\nD) Schwann cells\nE) Ependymal cells",
      back: "Answer: A) Astrocytes",
    },
    {
      id: "96",
      front:
        "The term “synaptic plasticity” refers to:\n\nA) The ability of synapses to change strength\nB) The rigidity of synaptic connections\nC) The breakdown of synapses\nD) The fixed number of synapses per neuron\nE) The inability of synapses to adapt",
      back: "Answer: A) The ability of synapses to change strength",
    },
    {
      id: "97",
      front:
        "Which neurotransmitter is a precursor to melatonin?\n\nA) Dopamine\nB) Serotonin\nC) Norepinephrine\nD) Acetylcholine\nE) Histamine",
      back: "Answer: B) Serotonin",
    },
    {
      id: "98",
      front:
        "The neurotransmitter glycine is primarily inhibitory in the:\n\nA) Brainstem and spinal cord\nB) Cerebral cortex\nC) Cerebellum\nD) Basal ganglia\nE) Hippocampus",
      back: "Answer: A) Brainstem and spinal cord",
    },
    {
      id: "99",
      front:
        "Which of the following is a key difference between hormones and neurotransmitters?\n\nA) Speed of action\nB) Distance of action\nC) Chemical structure\nD) Synthesis location\nE) Both A and B",
      back: "Answer: E) Both A and B",
    },
    {
      id: "100",
      front:
        "The neurotransmitter dynorphin is involved in:\n\nA) Pain relief\nB) Stress response amplification\nC) Reward processing\nD) All of the above\nE) None of the above",
      back: "Answer: D) All of the above",
    },
  ],
};

// --- Helper Utilities ---
const parseMCQ = (text) => {
  const parts = text.split("\n\n");
  const question = parts[0];
  const optionsText = parts[1] || "";

  // Extract options using Regex
  const optionRegex = /([A-E])\)\s*([^\n]+)/g;
  const options = [];
  let match;
  while ((match = optionRegex.exec(optionsText)) !== null) {
    options.push({ key: match[1], text: match[2] });
  }

  return { question, options };
};

const extractCorrectKey = (backText) => {
  const match = backText.match(/Answer:\s*([A-E])/);
  return match ? match[1] : null;
};

// --- Main App Component ---
export default function App() {
  const [currentDeckId, setCurrentDeckId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState("list");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <header
        className={`sticky top-0 z-10 border-b transition-colors ${
          isDarkMode
            ? "bg-slate-950/80 border-slate-800"
            : "bg-white/80 border-slate-200"
        } backdrop-blur-md`}
      >
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 font-bold text-xl cursor-pointer"
            onClick={() => setView("list")}
          >
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Layers size={20} />
            </div>
            <span className="font-serif tracking-wide">دِيمَة</span>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${
              isDarkMode
                ? "bg-slate-800 text-yellow-400"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {view === "list" ? (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Study Center</h1>
            <div
              onClick={() => {
                setCurrentDeckId("cns-1");
                setView("study");
              }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    isDarkMode
                      ? "bg-slate-800 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  <BookOpen size={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {CNS_BIOCHEMISTRY_DECK.title}
              </h3>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {CNS_BIOCHEMISTRY_DECK.description}
              </p>
            </div>
          </div>
        ) : (
          <StudySession
            deck={CNS_BIOCHEMISTRY_DECK}
            onBack={() => setView("list")}
            isDarkMode={isDarkMode}
          />
        )}
      </main>
    </div>
  );
}

function StudySession({ deck, onBack, isDarkMode }) {
  // sessionQueue tracks the indices of cards to be shown
  const [sessionQueue, setSessionQueue] = useState(deck.cards.map((_, i) => i));
  const [queueIndex, setQueueIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  const currentCardIndex = sessionQueue[queueIndex];
  const currentCard = deck.cards[currentCardIndex];
  const { question, options } = useMemo(
    () => parseMCQ(currentCard.front),
    [currentCard]
  );
  const correctKey = useMemo(
    () => extractCorrectKey(currentCard.back),
    [currentCard]
  );

  const progress = (masteredCount / deck.cards.length) * 100;

  const handleOptionSelect = (key) => {
    if (showFeedback) return;
    setSelectedKey(key);
    setShowFeedback(true);

    if (key === correctKey) {
      setMasteredCount((prev) => prev + 1);
    } else {
      // Logic: Repeat after several cards (or minutes)
      // We append it to a later position in the queue
      const nextPosition = queueIndex + 5; // Reappears after 5 other questions
      setSessionQueue((prev) => {
        const newQueue = [...prev];
        if (nextPosition >= newQueue.length) {
          newQueue.push(currentCardIndex);
        } else {
          newQueue.splice(nextPosition, 0, currentCardIndex);
        }
        return newQueue;
      });
    }
  };

  const handleNext = useCallback(() => {
    if (queueIndex < sessionQueue.length - 1) {
      setQueueIndex((prev) => prev + 1);
      setSelectedKey(null);
      setShowFeedback(false);
    }
  }, [queueIndex, sessionQueue.length]);

  const handleReset = () => {
    setSessionQueue(deck.cards.map((_, i) => i));
    setQueueIndex(0);
    setMasteredCount(0);
    setSelectedKey(null);
    setShowFeedback(false);
  };

  // Auto-advance logic could go here, but manual "Next" is better for reading feedback

  if (masteredCount === deck.cards.length && !showFeedback) {
    return (
      <div className="text-center py-20 space-y-6">
        <CheckCircle2 size={64} className="mx-auto text-green-500" />
        <h2 className="text-3xl font-bold">Deck Complete!</h2>
        <p className="text-slate-500">You've mastered all 100 questions.</p>
        <button
          onClick={handleReset}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
        >
          Study Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
            isDarkMode ? "hover:bg-slate-800" : "hover:bg-slate-200"
          }`}
        >
          <ChevronLeft size={18} />
          <span>Exit</span>
        </button>
        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-1.5 text-green-500">
            <CheckCircle2 size={16} /> {masteredCount} Mastered
          </div>
          <div className="text-slate-400">|</div>
          <div>
            Question {queueIndex + 1} / {sessionQueue.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${(queueIndex / sessionQueue.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div
        className={`p-8 rounded-3xl border shadow-xl ${
          isDarkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-100"
        }`}
      >
        <h2 className="text-xl md:text-2xl font-bold leading-relaxed mb-8">
          {question}
        </h2>

        {/* Options Grid */}
        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = selectedKey === opt.key;
            const isCorrect = opt.key === correctKey;

            let buttonClass = isDarkMode
              ? "bg-slate-800 border-slate-700 hover:border-indigo-500"
              : "bg-slate-50 border-slate-200 hover:border-indigo-300";

            if (showFeedback) {
              if (isCorrect)
                buttonClass =
                  "bg-green-500/10 border-green-500 text-green-600 dark:text-green-400";
              else if (isSelected && !isCorrect)
                buttonClass =
                  "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400";
              else buttonClass = "opacity-40 border-transparent";
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleOptionSelect(opt.key)}
                disabled={showFeedback}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${buttonClass}`}
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                    isSelected
                      ? "bg-current text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-lg leading-tight pt-1">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        {showFeedback && (
          <div className="mt-8 animate-in zoom-in-95 duration-300">
            <div
              className={`p-4 rounded-2xl flex items-center gap-3 ${
                selectedKey === correctKey
                  ? "bg-green-500/10 text-green-600"
                  : "bg-red-500/10 text-red-600"
              }`}
            >
              {selectedKey === correctKey ? (
                <>
                  <CheckCircle2 size={24} />
                  <span className="font-bold text-lg">Correct! Well done.</span>
                </>
              ) : (
                <>
                  <XCircle size={24} />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">Incorrect.</span>
                    <span className="text-sm opacity-80">
                      This question will reappear later for review.
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full mt-4 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
            >
              <span>Next Question</span>
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleReset}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
            isDarkMode
              ? "text-slate-400 hover:bg-slate-800"
              : "text-slate-500 hover:bg-slate-200"
          }`}
        >
          <RotateCcw size={16} />
          Restart Session
        </button>
      </div>
    </div>
  );
}
