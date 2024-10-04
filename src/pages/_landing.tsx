import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  BarChart,
  PieChart,
  TrendingUp,
  Smile,
  Meh,
  Frown,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/router";

interface Sentiment {
  type: string;
  confidence: number;
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [demoText, setDemoText] = useState("");
  const [sentiment, setSentiment] = useState<Sentiment | null>(null);

  const analyzeSentiment = () => {
    const sentiments = ["positive", "neutral", "negative"];
    const randomSentiment =
      sentiments[Math.floor(Math.random() * sentiments.length)];
    const confidence = Math.floor(Math.random() * 30) + 70;
    setSentiment({ type: randomSentiment, confidence });
  };

  const getSentimentIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <Smile className="h-6 w-6 text-green-500" />;
      case "neutral":
        return <Meh className="h-6 w-6 text-yellow-500" />;
      case "negative":
        return <Frown className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <motion.header
        className="px-4 lg:px-6 h-16 flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          <Sparkles className="h-6 w-6 mr-2" />
          SentiSocial
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button variant="outline" onClick={() => router.push("/register")}>
            Register
          </Button>
        </nav>
      </motion.header>
      <main className="flex-1">
        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div className="space-y-2" variants={fadeInUp}>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                  Understand Your Audience with AI-Powered Sentiment Analysis
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {`SentiSocial uses advanced AI to analyze the sentiment of your posts and audience reactions. Get insights, improve
                  engagement, and build a more positive online presence.`}
                </p>
              </motion.div>
              <motion.div
                className="w-full max-w-sm space-y-2"
                variants={fadeInUp}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full"
                />
                <Button className="w-full rounded-full" size="lg">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <motion.div
              className="grid gap-10 sm:grid-cols-2 md:grid-cols-3"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="h-6 w-6 mr-2 text-indigo-500" />
                      Real-time Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Instantly analyze the sentiment of your posts and comments
                    as they happen.
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-6 w-6 mr-2 text-purple-500" />
                      Sentiment Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Get detailed insights into positive, neutral, and negative
                    sentiments in your content.
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-900 dark:to-red-900 border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-6 w-6 mr-2 text-pink-500" />
                      Trend Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Track sentiment trends over time to improve your content
                    strategy.
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              See It In Action
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                className="space-y-4"
                variants={staggerChildren}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800"
                  variants={fadeInUp}
                >
                  <p className="text-lg mb-4">
                    {`"Just launched our new product! So excited to share it with
                    you all! #NewProduct #Innovation"`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-500 flex items-center">
                      <Smile className="h-5 w-5 mr-2" />
                      Positive Sentiment
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800"
                  variants={fadeInUp}
                >
                  <p className="text-lg mb-4">
                    {`"Our servers are currently down. We're working on fixing the
                    issue. Thank you for your patience."`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-500 flex items-center">
                      <Meh className="h-5 w-5 mr-2" />
                      Neutral Sentiment
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800"
                  variants={fadeInUp}
                >
                  <p className="text-lg mb-4">
                    {`"Disappointed with the recent changes to the platform. It's
                    become much harder to use. #Frustrated"`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-500 flex items-center">
                      <Frown className="h-5 w-5 mr-2" />
                      Negative Sentiment
                    </span>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="space-y-4"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold">How It Works</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our advanced AI analyzes the text of your social media posts
                  and comments in real-time. It considers factors like word
                  choice, context, and emoji usage to determine the overall
                  sentiment.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  This allows you to quickly understand how your audience
                  perceives your content, helping you to adjust your
                  communication strategy and improve engagement.
                </p>
                <Button size="lg" className="rounded-full">
                  Try It Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Try It Yourself
            </h2>
            <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 border-none shadow-xl">
              <CardHeader>
                <CardTitle>Sentiment Analysis Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Type your message here..."
                    value={demoText}
                    onChange={(e) => setDemoText(e.target.value)}
                    className="bg-white dark:bg-gray-700"
                  />
                  <Button onClick={analyzeSentiment} className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Sentiment
                  </Button>
                  {sentiment && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          {getSentimentIcon(sentiment.type)}
                          <span className="ml-2 capitalize">
                            {sentiment.type} Sentiment
                          </span>
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Confidence: {sentiment.confidence}%
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              How It Works
            </h2>
            <Tabs defaultValue="analyze" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="analyze">Analyze</TabsTrigger>
                <TabsTrigger value="insights">Get Insights</TabsTrigger>
                <TabsTrigger value="improve">Improve</TabsTrigger>
              </TabsList>
              <TabsContent value="analyze">
                <Card>
                  <CardHeader>
                    <CardTitle>Analyze Your Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Our AI-powered sentiment analysis tool scans your posts,
                    comments, and interactions in real-time. It considers
                    context, tone, and language nuances to accurately determine
                    sentiment.
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="insights">
                <Card>
                  <CardHeader>
                    <CardTitle>Get Valuable Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Receive detailed reports on sentiment distribution, trends
                    over time, and factors influencing sentiment. Understand how
                    your audience perceives your content and brand.
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="improve">
                <Card>
                  <CardHeader>
                    <CardTitle>Improve Your Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Use the insights to refine your content strategy, improve
                    customer service, and build stronger connections with your
                    audience. Watch your engagement and positive sentiment grow
                    over time.
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </motion.section>

        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {`Ready to Understand Your Audience's Sentiment?`}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mb-8">
              Sign up now and start analyzing your social media sentiment for
              free.
            </p>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row justify-center"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <Input
                  className="max-w-sm rounded-full"
                  placeholder="Enter your email"
                  type="email"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Button size="lg" className="rounded-full">
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <motion.footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 SentiSocial. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </motion.footer>
    </div>
  );
}
