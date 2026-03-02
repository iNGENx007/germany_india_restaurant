"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function TopNavbar() {
	useEffect(() => {
		let menuButton = null;
		let navbarMenu = null;
		let navbarComponent = null;
		let clickHandler = null;
		let outsideClickHandler = null;

		const setupNavbar = () => {
			menuButton = document.querySelector(".w-nav-button");
			navbarMenu = document.querySelector(".w-nav-menu");
			navbarComponent = document.querySelector(".navbar_component");

			if (!menuButton || !navbarMenu || !navbarComponent) {
				setTimeout(setupNavbar, 100);
				return;
			}

			if (clickHandler) {
				menuButton.removeEventListener("click", clickHandler);
			}

			clickHandler = (e) => {
				e.preventDefault();
				e.stopPropagation();
				const isOpen = navbarComponent.classList.contains("w--open");
				if (isOpen) {
					navbarComponent.classList.remove("w--open");
					navbarMenu.classList.remove("w--nav-menu-open");
					document.body.style.overflow = "";
				} else {
					navbarComponent.classList.add("w--open");
					navbarMenu.classList.add("w--nav-menu-open");
					document.body.style.overflow = "hidden";
				}
			};

			menuButton.addEventListener("click", clickHandler);

			if (outsideClickHandler) {
				document.removeEventListener("click", outsideClickHandler);
			}

			outsideClickHandler = (e) => {
				if (
					navbarComponent &&
					navbarComponent.classList.contains("w--open") &&
					!navbarComponent.contains(e.target) &&
					menuButton &&
					!menuButton.contains(e.target)
				) {
					navbarComponent.classList.remove("w--open");
					navbarMenu.classList.remove("w--nav-menu-open");
					document.body.style.overflow = "";
				}
			};

			document.addEventListener("click", outsideClickHandler);

			const navLinks = navbarMenu.querySelectorAll(".navbar_link");
			navLinks.forEach((link) => {
				link.addEventListener("click", () => {
					if (navbarComponent) {
						navbarComponent.classList.remove("w--open");
						navbarMenu.classList.remove("w--nav-menu-open");
						document.body.style.overflow = "";
					}
				});
			});
		};

		setupNavbar();
		const timeout = setTimeout(setupNavbar, 200);

		return () => {
			clearTimeout(timeout);
			if (menuButton && clickHandler) {
				menuButton.removeEventListener("click", clickHandler);
			}
			if (outsideClickHandler) {
				document.removeEventListener("click", outsideClickHandler);
			}
		};
	}, []);

	return (
		<div className="page-wrapper">
			<div className="buttons_mobile-wrapper">
				<a href="tel:+498121986166" className="button_mobile is-1 w-button">
					Reservierung
				</a>
				<a
					href="https://share.google/df6DQ9ljtyiBndTf2"
					target="_blank"
					rel="noopener noreferrer"
					className="button_mobile w-button"
				>
					Order to pickup
				</a>
			</div>

			<div
				data-animation="default"
				className="navbar_component w-nav"
				data-easing2="ease"
				data-easing="ease"
				data-collapse="all"
				data-w-id="25ee2989-7528-078a-6215-f3ce16ae41a6"
				role="banner"
				data-no-scroll="1"
				data-duration="0"
			>
				<div className="navbar_container">
					<a
						href="/"
						id="w-node-_25ee2989-7528-078a-6215-f3ce16ae41a8-16ae41a6"
						data-w-id="25ee2989-7528-078a-6215-f3ce16ae41a8"
						className="navbar_logo-link w-nav-brand"
					>
						<Image
							loading="eager"
							src="/images/logo.png"
							alt="Logo"
							className="navbar_logo"
							width={150}
							height={60}
						/>
						<Image
							src="/images/logo.png"
							loading="lazy"
							data-w-id="5426709b-5c20-473e-6fda-ba3a826a9da3"
							alt="Logo"
							className="navbar_logo is-white"
							width={150}
							height={60}
						/>
					</a>
					<div
						id="w-node-_33570b70-7d97-85f9-8fe2-43d3854f29bb-16ae41a6"
						className="nav_link-wrapper"
					>
						<a href="tel:+498121986166" className="button is-yellow w-button">
							Reservierung
						</a>
						<a
							href="https://share.google/df6DQ9ljtyiBndTf2"
							target="_blank"
							rel="noopener noreferrer"
							className="button is-yellow w-button"
						>
							Pickup Order
						</a>
					</div>
					<nav
						role="navigation"
						data-w-id="25ee2989-7528-078a-6215-f3ce16ae41b2"
						className="navbar_menu w-nav-menu"
					>
						<div className="navbar_menu-wrapper">
							<div className="navbar_links-wrapper">
								<a
									href="/"
									data-w-id="25ee2989-7528-078a-6215-f3ce16ae41b5"
									className="navbar_link w-nav-link"
								>
									Home
								</a>
								<a
									href="/menu"
									data-w-id="25ee2989-7528-078a-6215-f3ce16ae41b7"
									className="navbar_link w-nav-link"
								>
									Menü
								</a>
								<a
									href="/impression"
									data-w-id="25ee2989-7528-078a-6215-f3ce16ae41b9"
									className="navbar_link w-nav-link"
								>
									Impressionen
								</a>
								<a
									href="/events"
									data-w-id="b85b4db3-387f-80d2-f8e9-44fb13e1cd9b"
									className="navbar_link w-nav-link"
								>
									Gruppen &amp; Events
								</a>
								<a
									href="/karriere"
									data-w-id="25ee2989-7528-078a-6215-f3ce16ae41bb"
									className="navbar_link w-nav-link"
								>
									Karriere
								</a>
								<a
									href="/kontakt"
									data-w-id="25ee2989-7528-078a-6215-f3ce16ae41bd"
									className="navbar_link w-nav-link"
								>
									Kontakt
								</a>
								<div className="nav_mob_link-wrapper"></div>
							</div>
						</div>
					</nav>
					<div
						id="w-node-_25ee2989-7528-078a-6215-f3ce16ae41b1-16ae41a6"
						className="navbar-menu_wrapper"
					>
						<div className="mobile_links">
							<a
								aria-label="phone number"
								href="tel:+498121986166"
								className="mob_link w-inline-block"
							>
								<div className="icon_mob w-embed">
									<svg
										width="26"
										height="26"
										viewBox="0 0 26 26"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_432_2222)">
											<path fillRule="evenodd" clipRule="evenodd" d="M0.681311 9.74124C0.072789 7.96769 -0.182062 6.17853 0.140402 4.58701C0.431661 3.15153 1.18581 1.88767 2.56409 0.946285C2.81894 0.759048 3.06859 0.603016 3.31824 0.467789C3.57829 0.327361 3.84354 0.218139 4.1088 0.124521C4.6393 -0.0523147 5.19061 -0.0367116 5.68471 0.145325C6.17881 0.327361 6.6105 0.665429 6.90696 1.13872L9.36705 5.08111C9.6479 5.5284 9.76753 6.0277 9.73112 6.5166C9.69471 7.0107 9.50748 7.48919 9.17461 7.89488L7.86395 9.46559C7.71312 9.64763 7.6247 9.85567 7.6039 10.0689C7.58309 10.2822 7.6247 10.5058 7.73912 10.7138C8.53488 12.1805 9.68431 13.668 11.0106 14.9891C12.3316 16.3102 13.8191 17.4596 15.2858 18.2605C15.4939 18.3698 15.7175 18.4166 15.9308 18.3958C16.144 18.375 16.352 18.2866 16.5341 18.1357L18.1048 16.8251C18.5105 16.487 18.989 16.2998 19.4831 16.2633C19.972 16.2269 20.4765 16.3466 20.9186 16.6274L24.8609 19.0875C25.3342 19.384 25.6775 19.8157 25.8543 20.3098C26.0312 20.8039 26.052 21.3552 25.8752 21.8857C25.7867 22.1561 25.6723 22.4162 25.5319 22.6814C25.4019 22.9311 25.2406 23.1807 25.0534 23.4356C24.1068 24.8139 22.8429 25.568 21.4127 25.8593C19.8159 26.1817 18.032 25.9269 16.2584 25.3184C13.1014 24.2417 9.74152 21.9169 6.91216 19.0875C4.07759 16.2582 1.75793 12.8983 0.67611 9.74124H0.681311ZM1.39905 4.84187C1.1234 6.18893 1.36265 7.75445 1.89835 9.33036C2.91256 12.295 5.123 15.478 7.82234 18.1825C10.5269 20.8871 13.7099 23.0975 16.6745 24.1065C18.2504 24.6474 19.8107 24.8815 21.163 24.6058C22.2812 24.377 23.2694 23.7893 24.008 22.7074L24.0184 22.6866C24.164 22.489 24.294 22.2862 24.4033 22.0781C24.5073 21.8805 24.5957 21.6828 24.6581 21.4852C24.7413 21.2355 24.7361 20.9755 24.6581 20.7518C24.5749 20.523 24.4189 20.3254 24.1952 20.1849L20.2528 17.7248C20.0396 17.5948 19.8055 17.5376 19.5819 17.5532C19.3582 17.5688 19.1346 17.6572 18.9422 17.8133L17.3715 19.1239C16.9866 19.4464 16.5341 19.6284 16.066 19.6752C15.6031 19.722 15.1194 19.6284 14.6825 19.3892C13.0962 18.5258 11.5099 17.3036 10.1108 15.9045C8.71172 14.5054 7.48427 12.9139 6.6261 11.3328C6.38685 10.8907 6.29323 10.4122 6.34004 9.94929C6.38685 9.48119 6.57409 9.0287 6.89135 8.64383L8.20201 7.07311C8.35805 6.88067 8.45166 6.66223 8.46207 6.43338C8.47767 6.20454 8.42046 5.97049 8.29043 5.76245L5.83034 1.82006C5.68991 1.59642 5.48707 1.43518 5.26343 1.35717C5.03978 1.27395 4.77973 1.26875 4.53008 1.35717C4.33244 1.41958 4.1348 1.508 3.93716 1.61202C3.73432 1.72124 3.53148 1.84607 3.33384 1.99169L3.31304 2.0073C2.23122 2.74585 1.6435 3.73404 1.41466 4.85227L1.39905 4.84187Z" fill="currentcolor" />
										</g>
										<defs>
											<clipPath id="clip0_432_2222">
												<rect width="26" height="26" fill="currentcolor" />
											</clipPath>
										</defs>
									</svg>
								</div>
							</a>
							<a aria-label="location" href="https://maps.app.goo.gl/PFQf45ysWMXU4sPeA?g_st=iwb" className="mob_link w-inline-block">
								<div className="icon_mob w-embed">
									<svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clipPath="url(#clip0_432_2224)">
											<path fillRule="evenodd" clipRule="evenodd" d="M11.3678 29.181C10.3315 27.789 8.98689 26.3912 7.59291 24.9354C3.95991 21.1538 0 17.0358 0 11.7868C0 8.6722 1.34464 5.8476 3.51581 3.806C5.68697 1.7644 8.69082 0.5 12.0031 0.5C15.3153 0.5 18.3192 1.7644 20.4904 3.806C22.6615 5.8476 24.0062 8.6722 24.0062 11.7868C24.0062 17.0358 20.0463 21.1596 16.4133 24.9412C15.0131 26.397 13.6623 27.8006 12.6322 29.1984C12.3917 29.5232 11.9167 29.6044 11.5713 29.3782C11.4911 29.326 11.4233 29.2622 11.3739 29.1868L11.3678 29.181ZM8.72166 23.9784C9.89977 25.2022 11.047 26.3912 12.0031 27.5686C12.9591 26.3912 14.1064 25.2022 15.2845 23.9784C18.7263 20.394 22.4765 16.4906 22.4765 11.7868C22.4765 9.0666 21.3045 6.6016 19.4109 4.821C17.5173 3.0404 14.8959 1.9384 12.0031 1.9384C9.11025 1.9384 6.48882 3.0404 4.59522 4.821C2.70162 6.6016 1.52968 9.0666 1.52968 11.7868C1.52968 16.4964 5.27988 20.394 8.72166 23.9784ZM12.0031 8.1386C10.936 8.1386 9.96762 8.5446 9.26446 9.2058C8.56129 9.867 8.12953 10.7776 8.12953 11.781C8.12953 12.7844 8.56129 13.695 9.26446 14.3562C9.96762 15.0174 10.936 15.4234 12.0031 15.4234C13.0702 15.4234 14.0385 15.0174 14.7417 14.3562C15.4449 13.695 15.8766 12.7844 15.8766 11.781C15.8766 10.7776 15.4449 9.867 14.7417 9.2058C14.0385 8.5446 13.0702 8.1386 12.0031 8.1386ZM8.18504 8.1908C7.20432 9.113 6.59984 10.3774 6.59984 11.781C6.59984 13.1846 7.20432 14.4548 8.18504 15.3712C9.16577 16.2934 10.5104 16.8618 12.0031 16.8618C13.4958 16.8618 14.8466 16.2934 15.8211 15.3712C16.8018 14.449 17.4063 13.1846 17.4063 11.781C17.4063 10.3774 16.8018 9.1072 15.8211 8.1908C14.8404 7.2686 13.4958 6.7002 12.0031 6.7002C10.5104 6.7002 9.1596 7.2686 8.18504 8.1908Z" fill="currentcolor" />
											</g>
											<defs>
												<clipPath id="clip0_432_2224">
													<rect width="24" height="29" fill="currentcolor" transform="translate(0 0.5)" />
												</clipPath>
											</defs>
										</svg>
									</div>
								</a>
						</div>
						<div className="navbar_menu-button mobile_link-wrapper w-nav-button">
							<div className="menu-icon">
								<div className="menu-icon_wrapper">
									<div data-w-id="25ee2989-7528-078a-6215-f3ce16ae41c4" className="menu-icon_line-top">
										<div className="div-block-8"></div>
									</div>
									<div data-w-id="25ee2989-7528-078a-6215-f3ce16ae41c5" className="menu-icon_line-bottom">
										<div className="div-block-8"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
