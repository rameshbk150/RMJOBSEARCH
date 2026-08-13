"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  Menu,
  X,
  Search,
  LogIn,
  UserPlus,
  ChevronRight,
  ChevronDown,
  UserRound,
  LogOut,
  Coins,
  Settings,
  BriefcaseBusiness,
} from "lucide-react";

export default function Header({ siteData }) {
  const router = useRouter();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  // ======================================================
  // SEARCH
  // ======================================================

  const [searchQuery, setSearchQuery] = useState("");

  const profileRef = useRef(null);

  // ======================================================
  // LOAD USER FROM LOCAL STORAGE
  // ======================================================

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setUser(null);
          setAuthLoaded(true);
          return;
        }

        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);
      } catch (error) {
        console.error(
          "Unable to load logged-in user:",
          error
        );

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
      } finally {
        setAuthLoaded(true);
      }
    };

    loadUser();

    // Same-tab login/logout updates
    window.addEventListener(
      "authChanged",
      loadUser
    );

    // Another browser tab
    window.addEventListener(
      "storage",
      loadUser
    );

    return () => {
      window.removeEventListener(
        "authChanged",
        loadUser
      );

      window.removeEventListener(
        "storage",
        loadUser
      );
    };
  }, []);

  // ======================================================
  // CLOSE PROFILE DROPDOWN
  // ======================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ======================================================
  // CLOSE MOBILE MENU ON RESIZE
  // ======================================================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setMobileMenu(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  // ======================================================
  // SEARCH JOBS
  // ======================================================

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      router.push("/jobs");
      return;
    }

    router.push(
      `/jobs?q=${encodeURIComponent(query)}`
    );

    // Close mobile menu after searching
    setMobileMenu(false);
  };

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setProfileMenu(false);
    setMobileMenu(false);

    window.dispatchEvent(
      new Event("authChanged")
    );

    router.push("/");
    router.refresh();
  };

  // ======================================================
  // USER INITIAL
  // ======================================================

  const getInitial = () => {
    if (!user?.name) return "U";

    return user.name
      .trim()
      .charAt(0)
      .toUpperCase();
  };

  // ======================================================
  // AUTH LOADING
  // ======================================================

  if (!authLoaded) {
    return (
      <header className="main-header">
        <div className="header-container">

          <Link
            href="/"
            className="header-logo"
            aria-label="Homepage"
          >
            <Image
              src={siteData.logo}
              alt={
                siteData?.name ||
                "Job Portal"
              }
              width={700}
              height={400}
              priority
              className="header-logo-image"
            />
          </Link>

        </div>
      </header>
    );
  }

  return (
    <header className="main-header">

      <div className="header-container">

        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <Link
          href="/"
          className="header-logo"
          aria-label="Homepage"
          onClick={() => {
            setMobileMenu(false);
            setProfileMenu(false);
          }}
        >
          <Image
            src={siteData.logo}
            alt={
              siteData?.name ||
              "Job Portal"
            }
            width={700}
            height={400}
            priority
            className="header-logo-image"
          />
        </Link>

        {/* ================================================= */}
        {/* DESKTOP SEARCH */}
        {/* ================================================= */}

        <div className="header-search-area">

          <form
            onSubmit={handleSearch}
            className="header-search-box"
          >

            <Search
              size={18}
              className="header-search-icon"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(
                  event.target.value
                )
              }
              placeholder="Search jobs, companies, skills..."
              className="header-search-input"
              aria-label="Search jobs"
            />

            {searchQuery && (
              <button
                type="button"
                className="header-search-clear"
                onClick={() =>
                  setSearchQuery("")
                }
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}

            <button
              type="submit"
              className="header-search-submit"
              aria-label="Search"
            >
              <Search size={17} />
            </button>

          </form>

        </div>

        {/* ================================================= */}
        {/* DESKTOP NAV */}
        {/* ================================================= */}

        <nav className="header-desktop-nav">

          <div className="header-nav-links">

            {siteData.navLinks?.map(
              (link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className="header-nav-link"
                >
                  {link.name}
                </Link>
              )
            )}

          </div>

          <div className="header-divider" />

          {/* ================================================= */}
          {/* BEFORE LOGIN */}
          {/* ================================================= */}

          {!user && (
            <div className="header-auth-buttons">

              <Link
                href="/login"
                className="header-login-button"
              >
                <LogIn size={17} />
                Login
              </Link>

              <Link
                href="/register"
                className="header-register-button"
              >
                <UserPlus size={17} />
                Register
              </Link>

            </div>
          )}

          {/* ================================================= */}
          {/* AFTER LOGIN */}
          {/* ================================================= */}

          {user && (
            <div className="header-user-area">

              {/* CREDITS */}

              <Link
                href="/credits"
                className="header-credit-box"
              >

                <div className="header-credit-icon">
                  <Coins size={18} />
                </div>

                <div className="header-credit-content">

                  <span className="header-credit-label">
                    Available Credits
                  </span>

                  <span className="header-credit-number">
                    {user.credits ?? 0}
                  </span>

                </div>

              </Link>

              {/* PROFILE */}

              <div
                ref={profileRef}
                className="header-profile-wrapper"
              >

                <button
                  type="button"
                  className={`header-profile-button ${
                    profileMenu
                      ? "header-profile-button-active"
                      : ""
                  }`}
                  onClick={() =>
                    setProfileMenu(
                      (previous) =>
                        !previous
                    )
                  }
                  aria-expanded={
                    profileMenu
                  }
                  aria-label="Open account menu"
                >

                  <UserAvatar
                    user={user}
                    getInitial={
                      getInitial
                    }
                    size="small"
                  />

                  <div className="header-profile-text">

                    <span className="header-profile-name">
                      {user.name ||
                        "My Account"}
                    </span>

                    <span className="header-profile-subtitle">
                      My Account
                    </span>

                  </div>

                  <ChevronDown
                    size={16}
                    className={`header-chevron ${
                      profileMenu
                        ? "header-chevron-open"
                        : ""
                    }`}
                  />

                </button>

                {/* ================================================= */}
                {/* PROFILE DROPDOWN */}
                {/* ================================================= */}

                {profileMenu && (
                  <div className="header-profile-dropdown">

                    <div className="profile-dropdown-top">

                      <UserAvatar
                        user={user}
                        getInitial={
                          getInitial
                        }
                        size="large"
                      />

                      <div className="profile-dropdown-details">

                        <p className="profile-dropdown-name">
                          {user.name ||
                            "User"}
                        </p>

                        <p className="profile-dropdown-info">
                          {user.email ||
                            user.phone ||
                            `User ID: ${
                              user.id || "-"
                            }`}
                        </p>

                      </div>

                    </div>

                    <div className="profile-dropdown-credit-card">

                      <div>

                        <p className="profile-credit-label">
                          Available Credits
                        </p>

                        <p className="profile-credit-value">
                          {user.credits ??
                            0}
                        </p>

                      </div>

                      <div className="profile-credit-icon">
                        <Coins size={20} />
                      </div>

                    </div>

                    <div className="profile-dropdown-divider" />

                    <div className="profile-dropdown-menu">

                      <DropdownLink
                        href="/profile"
                        icon={
                          <UserRound
                            size={18}
                          />
                        }
                        label="View Profile"
                        onClick={() =>
                          setProfileMenu(
                            false
                          )
                        }
                      />

                      <DropdownLink
                        href="/applied-jobs"
                        icon={
                          <BriefcaseBusiness
                            size={18}
                          />
                        }
                        label="Applied Jobs"
                        onClick={() =>
                          setProfileMenu(
                            false
                          )
                        }
                      />

                      <DropdownLink
                        href="/profile/settings"
                        icon={
                          <Settings
                            size={18}
                          />
                        }
                        label="Account Settings"
                        onClick={() =>
                          setProfileMenu(
                            false
                          )
                        }
                      />

                    </div>

                    <div className="profile-dropdown-divider" />

                    <button
                      type="button"
                      onClick={
                        handleLogout
                      }
                      className="profile-dropdown-logout"
                    >
                      <LogOut size={18} />

                      <span>
                        Sign out
                      </span>
                    </button>

                  </div>
                )}

              </div>

            </div>
          )}

        </nav>

        {/* ================================================= */}
        {/* MOBILE MENU BUTTON */}
        {/* ================================================= */}

        <button
          type="button"
          className="header-mobile-button"
          onClick={() => {
            setMobileMenu(
              (previous) =>
                !previous
            );

            setProfileMenu(false);
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenu}
        >
          {mobileMenu ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>

      </div>

      {/* ================================================= */}
      {/* MOBILE NAVIGATION */}
      {/* ================================================= */}

      {mobileMenu && (
        <div className="mobile-header-menu">

          <div className="mobile-header-container">

            {/* ================================================= */}
            {/* LOGGED IN USER */}
            {/* ================================================= */}

            {user && (
              <div className="mobile-user-card">

                <UserAvatar
                  user={user}
                  getInitial={
                    getInitial
                  }
                  size="large"
                />

                <div className="mobile-user-details">

                  <p className="mobile-user-name">
                    {user.name}
                  </p>

                  <p className="mobile-user-email">
                    {user.email ||
                      user.phone ||
                      user.id}
                  </p>

                </div>

                <Link
                  href="/profile"
                  className="mobile-profile-arrow"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                >
                  <ChevronRight
                    size={18}
                  />
                </Link>

              </div>
            )}

            {/* ================================================= */}
            {/* MOBILE SEARCH */}
            {/* ================================================= */}

            <form
              onSubmit={handleSearch}
              className="mobile-search-box"
            >

              <Search
                size={18}
                className="mobile-search-icon"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                placeholder="Search jobs, companies, skills..."
                className="mobile-search-input"
                aria-label="Search jobs"
              />

              {searchQuery && (
                <button
                  type="button"
                  className="mobile-search-clear"
                  onClick={() =>
                    setSearchQuery("")
                  }
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}

              <button
                type="submit"
                className="mobile-search-submit"
                aria-label="Search"
              >
                <Search size={17} />
              </button>

            </form>

            {/* ================================================= */}
            {/* NAVIGATION */}
            {/* ================================================= */}

            <div className="mobile-nav-links">

              {siteData.navLinks?.map(
                (link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="mobile-nav-link"
                    onClick={() =>
                      setMobileMenu(
                        false
                      )
                    }
                  >

                    <span>
                      {link.name}
                    </span>

                    <ChevronRight
                      size={17}
                    />

                  </Link>
                )
              )}

            </div>

            {/* ================================================= */}
            {/* BEFORE LOGIN */}
            {/* ================================================= */}

            {!user && (
              <div className="mobile-auth-buttons">

                <Link
                  href="/login"
                  className="mobile-login-button"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                >
                  <LogIn size={18} />
                  Login
                </Link>

                <Link
                  href="/register"
                  className="mobile-register-button"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                >
                  <UserPlus size={18} />
                  Register
                </Link>

              </div>
            )}

            {/* ================================================= */}
            {/* AFTER LOGIN */}
            {/* ================================================= */}

            {user && (
              <div className="mobile-user-section">

                <Link
                  href="/credits"
                  className="mobile-credit-card"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                >

                  <div className="mobile-credit-left">

                    <Coins size={19} />

                    <span>
                      Available Credits
                    </span>

                  </div>

                  <strong>
                    {user.credits ?? 0}
                  </strong>

                </Link>

                <Link
                  href="/profile"
                  className="mobile-account-link"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                >

                  <UserRound
                    size={18}
                  />

                  <span>
                    View Profile
                  </span>

                  <ChevronRight
                    size={16}
                    className="mobile-link-arrow"
                  />

                </Link>

                <Link
                  href="/applied-jobs"
                  className="mobile-account-link"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                >

                  <BriefcaseBusiness
                    size={18}
                  />

                  <span>
                    Applied Jobs
                  </span>

                  <ChevronRight
                    size={16}
                    className="mobile-link-arrow"
                  />

                </Link>

                <Link
                  href="/profile/settings"
                  className="mobile-account-link"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                >

                  <Settings size={18} />

                  <span>
                    Account Settings
                  </span>

                  <ChevronRight
                    size={16}
                    className="mobile-link-arrow"
                  />

                </Link>

                <button
                  type="button"
                  onClick={
                    handleLogout
                  }
                  className="mobile-logout-button"
                >

                  <LogOut size={18} />

                  Sign out

                </button>

              </div>
            )}

          </div>

        </div>
      )}

    </header>
  );
}

// ======================================================
// USER AVATAR
// ======================================================

function UserAvatar({
  user,
  getInitial,
  size = "small",
}) {
  const avatarClass =
    size === "large"
      ? "user-avatar user-avatar-large"
      : "user-avatar user-avatar-small";

  if (user?.avatar) {
    return (
      <div className={avatarClass}>

        <Image
          src={user.avatar}
          alt={
            user.name || "User"
          }
          fill
          sizes={
            size === "large"
              ? "48px"
              : "40px"
          }
          className="user-avatar-image"
        />

      </div>
    );
  }

  return (
    <div
      className={`${avatarClass} user-avatar-fallback`}
    >
      {getInitial()}
    </div>
  );
}

// ======================================================
// DROPDOWN LINK
// ======================================================

function DropdownLink({
  href,
  icon,
  label,
  onClick,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="profile-dropdown-link"
    >

      <span className="profile-dropdown-link-icon">
        {icon}
      </span>

      <span className="profile-dropdown-link-text">
        {label}
      </span>

      <ChevronRight
        size={16}
        className="profile-dropdown-link-arrow"
      />

    </Link>
  );
}