import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {
  ChevronRight,
  MapPin,
  Users,
  Calendar,
  CheckCircle2,
  Star,
  Download,
  Menu,
} from "lucide-react";
import landingBackground from "../../public/landing-image.svg";
import Link from "next/link";
import pickleballLogo2 from "@/../public/pickleball-logo-2.svg";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="fixed inset-0 bg-[#01A7FF] px-4 z-40 h-16 w-full">
        <div className="container flex h-16 items-center justify-between py-4 px-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl text-white font-bold">PickePals</span>
            <Image
              src={pickleballLogo2}
              width={55}
              height={55}
              alt="logo"
              className="rounded-full"
            ></Image>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-base">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {/* <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#community"
              className="text-sm font-medium hover:text-primary"
            >
              Community
            </Link> */}
            <Button
              className="bg-[#c0ff18] hover:bg-[#c0ff18]/95 text-black "
              asChild
            >
              <SignUpButton />
            </Button>
            <Button variant={"ghost"} className="text-white" asChild>
              <SignInButton />
            </Button>

            <UserButton />
          </nav>
        </div>
      </header>
      {/* hero section */}
      <section
        className="w-full h-[600px] bg-[#01A7FF]"
        style={{
          backgroundImage: `url(${landingBackground.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
        }}
      >
        <div className="container px-4 md:px-6 mt-36 w-full h-full flex items-start justify-end">
          <div className="flex flex-col gap-8 max-w-lg items-end mr-10">
            <div className="space-y-2">
              <p className="text-white text-3xl text-right">IMPROVE YOUR</p>
              <h1 className=" text-6xl text-right font-bold text-[#c0ff18]">
                PADDLE SKILLS
              </h1>
              <p className="max-w-[600px] text-right text-white md:text-xl">
                Connect with local pickleball players at your skill level,
                discover new courts, and join our growing community!
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="gap-1 bg-[#c0ff18] text-black hover:bg-[#c0ff18]/95"
              >
                Search Courts <ChevronRight className="h-4 w-4" />
              </Button>
              {/* <Button size="lg" variant="outline">
                  Learn More
                </Button> */}
            </div>

            {/* <Image
              src="https://placehold.co/550x550"
              width={550}
              height={550}
              alt="PicklePals App Screenshot"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            /> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need to Play
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                PicklePals brings together all the tools you need to enjoy
                pickleball in your community.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Find Local Courts</h3>
              <p className="text-center text-muted-foreground">
                Discover pickleball courts near you with ratings, amenities, and
                real-time availability.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Match With Players</h3>
              <p className="text-center text-muted-foreground">
                Connect with players at your skill level for competitive and fun
                matches.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Join Events</h3>
              <p className="text-center text-muted-foreground">
                Find and register for local tournaments, clinics, and social
                play events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section
        id="community"
        className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-12 xl:grid-cols-[600px_1fr]">
            <Image
              src="https://placehold.co/400x550"
              width={200}
              height={550}
              alt="PicklePals Community"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join a Growing Community
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  PicklePals is more than an app - it's a community of
                  passionate players who love the game.
                </p>
              </div>
              <ul className="grid gap-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-bold">10,000+ Active Players</h3>
                    <p className="text-muted-foreground">
                      Connect with thousands of players in your area
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-bold">Skill-Based Matching</h3>
                    <p className="text-muted-foreground">
                      Find players at your level from beginners to advanced
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-bold">Local Groups</h3>
                    <p className="text-muted-foreground">
                      Join community groups organized by location and interest
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                What Players Are Saying
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from the PicklePals community about how the app has changed
                their game.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "PicklePals helped me find courts I never knew existed and
                  connect with players at my level. I've made great friends and
                  improved my game!"
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="https://placehold.co/40x40"
                  width={40}
                  height={40}
                  alt="User"
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">Sarah T.</p>
                  <p className="text-sm text-muted-foreground">
                    Beginner Player
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "As a competitive player, finding worthy opponents was always
                  a challenge. PicklePals solved that problem completely!"
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="https://placehold.co/40x40"
                  width={40}
                  height={40}
                  alt="User"
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">Michael R.</p>
                  <p className="text-sm text-muted-foreground">
                    Advanced Player
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "I moved to a new city and didn't know anyone. PicklePals
                  helped me find the local pickleball scene and make new friends
                  instantly!"
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="https://placehold.co/40x40"
                  width={40}
                  height={40}
                  alt="User"
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">Jamie L.</p>
                  <p className="text-sm text-muted-foreground">
                    Intermediate Player
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                How PicklePals Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Getting started is easy. Download the app and find your
                pickleball community in minutes.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold">Create Your Profile</h3>
              <p className="text-center text-muted-foreground">
                Set up your player profile with your skill level, playing style,
                and availability.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold">Discover & Connect</h3>
              <p className="text-center text-muted-foreground">
                Find courts, players, and events in your area that match your
                preferences.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Play & Grow</h3>
              <p className="text-center text-muted-foreground">
                Schedule games, track your progress, and become part of the
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section
        id="download"
        className="w-full py-12 md:py-24 lg:py-32 border-t"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Find Your Pickleball Community?
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Download PicklePals today and start connecting with players in
                your area.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                App Store
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Download className="h-5 w-5" />
                Google Play
              </Button>
            </div>
            <div className="mt-4">
              <Image
                src="https://placehold.co/600x300"
                width={600}
                height={300}
                alt="PicklePals App Screenshots"
                className="mx-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
