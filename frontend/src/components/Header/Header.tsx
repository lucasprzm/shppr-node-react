import appLogo from "../../assets/3624755.jpg";

function Header() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 fixed top-0 lg:relative z-[1000]">
      <div className="mx-auto max-w-[100rem] pl-3 pr-2 sm:pl-4 lg:px-4 2xl:px-6">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="my-auto">
              <img className="h-14 w-auto" src={appLogo} alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
