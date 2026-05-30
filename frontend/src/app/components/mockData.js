export const MOCK_TAGS = [
    { id: "1", name: "Machine Learning", count: 5, color: "#4F6EF5" },
    { id: "2", name: "Biology", count: 3, color: "#10B981" },
    { id: "3", name: "History", count: 4, color: "#F59E0B" },
    { id: "4", name: "Mathematics", count: 6, color: "#8B5CF6" },
    { id: "5", name: "Computer Science", count: 8, color: "#EC4899" },
    { id: "6", name: "Physics", count: 2, color: "#06B6D4" },
    { id: "7", name: "Economics", count: 3, color: "#F97316" },
];
export const MOCK_NOTES = [
    {
        id: "1",
        title: "Introduction to Neural Networks",
        content: `A neural network is a series of algorithms that endeavors to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates. Neural networks can adapt to changing input so the network generates the best possible result without needing to redesign the output criteria.

The concept of neural networks, which has its roots in artificial intelligence, is swiftly gaining popularity in the development of trading systems. Such systems include:

Backpropagation is a method used to train neural networks. It works by calculating the gradient of the loss function with respect to each weight, which is then used to update the weights.

Types of neural networks include: Feedforward neural networks, Convolutional neural networks (CNN), Recurrent neural networks (RNN), Long short-term memory (LSTM), and Generative adversarial networks (GAN).`,
        summary: `Neural networks are computational models inspired by the human brain, designed to recognize patterns and relationships in data. They consist of layers of interconnected nodes (neurons) that process information and adapt through training algorithms like backpropagation. Key types include feedforward networks for basic tasks, CNNs for image recognition, and RNNs/LSTMs for sequential data like text.`,
        revisionNotes: [
            "Neural networks = brain-inspired algorithms that find patterns in data",
            "Backpropagation = training method using gradient descent to update weights",
            "CNN = best for spatial data (images), RNN/LSTM = best for sequential data (text)",
            "Key components: input layer → hidden layers → output layer",
            "Activation functions (ReLU, Sigmoid, Softmax) introduce non-linearity",
        ],
        tags: ["Machine Learning", "Computer Science", "Mathematics"],
        createdAt: "2025-05-20T10:30:00Z",
        updatedAt: "2025-05-21T14:15:00Z",
        aiProcessed: true,
        uploadedFile: "neural_networks_lecture.pdf",
        wordCount: 312,
    },
    {
        id: "2",
        title: "The French Revolution — Key Causes & Events",
        content: `The French Revolution (1789–1799) was a period of radical political and societal change in France. It began with the Estates General of 1789 and ended with Napoleon Bonaparte's coup d'état in 1799.

Key Causes:
1. Financial crisis: France was nearly bankrupt due to wars and royal spending
2. Social inequality: The Third Estate bore most of the tax burden
3. Enlightenment ideas: Philosophy of Rousseau, Voltaire influenced the public
4. Food shortages: Bread prices soared, causing widespread discontent
5. Weak leadership: King Louis XVI was indecisive and ineffective

Key Events:
- June 1789: Third Estate forms National Assembly
- July 1789: Storming of the Bastille
- August 1789: Declaration of the Rights of Man
- 1793: Reign of Terror begins under Robespierre
- 1799: Napoleon's coup ends the Revolution`,
        summary: `The French Revolution (1789–1799) fundamentally transformed France from a monarchy to a republic. Driven by financial crisis, social inequality, and Enlightenment philosophy, the revolution saw the fall of the Bourbon monarchy, the Reign of Terror, and eventually Napoleon's rise to power. It introduced principles of liberty, equality, and popular sovereignty that influenced democratic movements worldwide.`,
        revisionNotes: [
            "Timeline: 1789–1799, ended with Napoleon's coup",
            "5 main causes: debt, inequality, Enlightenment, food prices, weak king",
            "Bastille stormed July 14, 1789 — symbolic start of revolution",
            "Reign of Terror (1793–94): ~17,000 executions under Robespierre",
            "Legacy: spread of democratic ideals across Europe and Americas",
        ],
        tags: ["History"],
        createdAt: "2025-05-18T09:00:00Z",
        updatedAt: "2025-05-18T11:30:00Z",
        aiProcessed: true,
        wordCount: 198,
    },
    {
        id: "3",
        title: "Linear Algebra: Eigenvalues & Eigenvectors",
        content: `An eigenvector of a square matrix A is a non-zero vector v such that multiplication by A only changes the scale of v (not its direction).

The scalar λ is called an eigenvalue.

The equation: Av = λv

To find eigenvalues, solve the characteristic equation: det(A - λI) = 0

Properties of eigenvalues:
- The sum of eigenvalues equals the trace of the matrix
- The product of eigenvalues equals the determinant
- A symmetric matrix has real eigenvalues
- Orthogonal eigenvectors for symmetric matrices

Applications: Principal Component Analysis (PCA), Google PageRank algorithm, quantum mechanics, stability analysis in differential equations.`,
        summary: `Eigenvalues and eigenvectors are fundamental linear algebra concepts. An eigenvector of matrix A is a special vector that only scales (not rotates) when multiplied by A, with the scaling factor being the eigenvalue λ. Found by solving det(A - λI) = 0, they have widespread applications in data science (PCA), web search algorithms, and physics.`,
        revisionNotes: [
            "Eigenvector equation: Av = λv (only scale changes, not direction)",
            "Find eigenvalues: solve det(A - λI) = 0 (characteristic polynomial)",
            "Trace = sum of eigenvalues; Determinant = product of eigenvalues",
            "Symmetric matrices always have real eigenvalues and orthogonal eigenvectors",
            "PCA uses eigenvectors to find directions of maximum variance in data",
        ],
        tags: ["Mathematics", "Computer Science"],
        createdAt: "2025-05-15T14:00:00Z",
        updatedAt: "2025-05-16T09:45:00Z",
        aiProcessed: true,
        wordCount: 156,
    },
    {
        id: "4",
        title: "DNA Replication & Transcription",
        content: `DNA replication is the process by which a cell duplicates its DNA before cell division. The process follows the semi-conservative model where each new DNA molecule contains one original strand and one newly synthesized strand.

Steps of DNA Replication:
1. Initiation: Helicase unwinds the double helix at the origin of replication
2. Elongation: DNA polymerase adds nucleotides in 5' to 3' direction
3. Termination: Replication is completed and new strands are proofread

Key enzymes: Helicase, Primase, DNA Polymerase III, DNA Ligase, Topoisomerase

Transcription is the synthesis of RNA from a DNA template. It produces mRNA that carries genetic information from the nucleus to the ribosome for translation.`,
        summary: null,
        revisionNotes: undefined,
        tags: ["Biology"],
        createdAt: "2025-05-12T11:00:00Z",
        updatedAt: "2025-05-12T11:00:00Z",
        aiProcessed: false,
        wordCount: 143,
    },
    {
        id: "5",
        title: "TypeScript Generics & Type Utilities",
        content: `Generics allow you to write flexible, reusable code that works with any type. They act as type placeholders that are filled in when the function or component is used.

Basic generic function:
function identity<T>(arg: T): T { return arg; }

Built-in utility types:
- Partial<T>: makes all properties optional
- Required<T>: makes all properties required
- Readonly<T>: makes all properties readonly
- Pick<T, K>: picks specific properties
- Omit<T, K>: omits specific properties
- Record<K, V>: creates an object type with keys K and values V

Conditional types: T extends U ? X : Y
Mapped types: { [P in keyof T]: T[P] }
Template literal types: type Greeting = \`Hello, \${string}\``,
        summary: `TypeScript generics are parameterized types that enable writing flexible, type-safe reusable code. Like function parameters but for types, generics allow one implementation to work across multiple types. Combined with utility types (Partial, Required, Pick, Omit) and advanced patterns like conditional types and mapped types, they form the foundation of scalable TypeScript codebases.`,
        revisionNotes: [
            "Generic syntax: <T> is a type parameter, filled at usage time",
            "Constraints: <T extends SomeType> restricts what T can be",
            "Partial<T> = all optional, Required<T> = all required, Readonly<T> = no mutations",
            "Pick<T, K> selects properties; Omit<T, K> removes properties",
            "Conditional types: T extends U ? X : Y — enables type-level if-else logic",
        ],
        tags: ["Computer Science"],
        createdAt: "2025-05-10T16:30:00Z",
        updatedAt: "2025-05-11T10:20:00Z",
        aiProcessed: true,
        uploadedFile: "typescript_advanced.pdf",
        wordCount: 178,
    },
    {
        id: "6",
        title: "Supply and Demand — Market Equilibrium",
        content: `Supply and demand is one of the most fundamental concepts in economics. It describes the relationship between the availability of a product and the desire for it.

Law of Demand: When price increases, quantity demanded decreases (inverse relationship)
Law of Supply: When price increases, quantity supplied increases (direct relationship)

Market Equilibrium occurs when quantity supplied equals quantity demanded. At this point, the market clears — there is no surplus or shortage.

Shifts in demand: income, preferences, prices of related goods, expectations, number of buyers
Shifts in supply: input costs, technology, government policies, expectations, number of sellers

Elasticity measures how responsive quantity is to price changes. PED = % change in quantity / % change in price`,
        summary: null,
        revisionNotes: undefined,
        tags: ["Economics"],
        createdAt: "2025-05-08T13:00:00Z",
        updatedAt: "2025-05-08T13:00:00Z",
        aiProcessed: false,
        wordCount: 139,
    },
    {
        id: "7",
        title: "Quantum Mechanics — Wave-Particle Duality",
        content: `Wave-particle duality is the concept that every particle or quantum entity may be described as either a particle or a wave. This property is characteristic of quantum mechanics.

The double-slit experiment demonstrates this duality: electrons passing through two slits create an interference pattern (wave behavior) but are detected as individual particles.

The de Broglie hypothesis (1924): λ = h/mv
where λ = wavelength, h = Planck's constant, m = mass, v = velocity

Heisenberg's Uncertainty Principle: Δx · Δp ≥ ħ/2
It is impossible to simultaneously know both the exact position and exact momentum of a particle.

The Schrödinger equation describes how quantum states evolve over time.`,
        summary: `Wave-particle duality, a cornerstone of quantum mechanics, states that quantum entities like electrons behave as both waves and particles depending on how they're observed. Demonstrated by the double-slit experiment, this duality is mathematically expressed through de Broglie's wavelength equation and constrained by Heisenberg's Uncertainty Principle, which forbids simultaneous precise measurement of position and momentum.`,
        revisionNotes: [
            "Wave-particle duality: quantum objects are neither purely waves nor particles",
            "Double-slit experiment: proves interference (wave) but point detection (particle)",
            "de Broglie: λ = h/mv — smaller/faster objects have shorter wavelengths",
            "Heisenberg Uncertainty: Δx · Δp ≥ ħ/2 — precision tradeoff is fundamental, not measurement error",
            "Schrödinger equation describes probability amplitude evolution over time",
        ],
        tags: ["Physics", "Mathematics"],
        createdAt: "2025-05-05T10:00:00Z",
        updatedAt: "2025-05-06T08:30:00Z",
        aiProcessed: true,
        wordCount: 164,
    },
    {
        id: "8",
        title: "React Hooks — useState & useEffect",
        content: `React Hooks allow function components to use state and side effects. Before hooks, these features were only available in class components.

useState:
const [count, setCount] = useState(0);
- Returns state variable and setter function
- State updates trigger re-render
- Can hold any value: number, string, object, array

useEffect:
useEffect(() => {
  // side effect code
  return () => { /* cleanup */ };
}, [dependencies]);
- Runs after every render by default
- Empty [] = runs once on mount
- [dep1, dep2] = runs when deps change

Other important hooks: useCallback, useMemo, useRef, useContext, useReducer`,
        summary: null,
        revisionNotes: undefined,
        tags: ["Computer Science"],
        createdAt: "2025-05-02T14:00:00Z",
        updatedAt: "2025-05-02T14:00:00Z",
        aiProcessed: false,
        wordCount: 122,
    },
];
export const STATS = {
    totalNotes: MOCK_NOTES.length,
    aiProcessed: MOCK_NOTES.filter(n => n.aiProcessed).length,
    uploadedDocs: MOCK_NOTES.filter(n => n.uploadedFile).length,
};
