import { Layout } from "./components/Layout";
import { Button, LangProvider, useRoute } from "./lib/site";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Involved from "./pages/Involved";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl font-extrabold tracking-tight text-ink-200">404</p>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink-900">
        Seite nicht gefunden / Page not found
      </h1>
      <div className="mt-8">
        <Button to="/">Startseite / Home</Button>
      </div>
    </div>
  );
}

const routes: Record<string, React.ComponentType> = {
  "/": Home,
  "/ueber-uns": About,
  "/projekte": Projects,
  "/aktuelles": News,
  "/mitmachen": Involved,
  "/partner": Partners,
  "/kontakt": Contact,
};

function Router() {
  const path = useRoute();

  const articleMatch = path.match(/^\/aktuelles\/artikel\/([a-z0-9-]+)$/);
  const eventMatch = path.match(/^\/aktuelles\/termin\/([a-z0-9-]+)$/);
  const projectMatch = path.match(/^\/projekte\/detail\/([a-z0-9-]+)$/);

  let page: React.ReactNode;
  if (articleMatch) {
    page = <NewsDetail type="artikel" slug={articleMatch[1]} />;
  } else if (eventMatch) {
    page = <NewsDetail type="termin" slug={eventMatch[1]} />;
  } else if (projectMatch) {
    page = <ProjectDetail slug={projectMatch[1]} />;
  } else {
    const Page = routes[path] ?? NotFound;
    page = <Page />;
  }

  return <Layout path={path}>{page}</Layout>;
}

export default function App() {
  return (
    <LangProvider>
      <Router />
    </LangProvider>
  );
}
