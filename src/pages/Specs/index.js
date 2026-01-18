import { useEffect } from "react";
import desktop from "../../assets/imgs/desktop.png";

function Specs() {
  useEffect(() => {
    document.title = "🖥 - Puppy";
  }, []);

  const laptopSpecs = {
    laptopCpu:
      "Intel Core i3-12100F (3.3GHz, turbo up to 4.3GHz, 4 cores 8 threads, 12MB Cache, 58W) - Intel LGA 1700",
    laptopRam: "OCPC X3TREME RGB AURA 16GB RAM",
    laptopGpu: "Radeon RX 6600 8GB GDDR6",
    laptopDisplay: "1920 x 1080 (32bit) (64bit)",
    laptopOs: "Windows 11 Edition Revision OS",
    laptopDisk: "Kingston SSD (1TB, 3,500 / 2,800 MB/s)",
  };

  const phoneSpecs = {
    phoneCpu: "Snapdragon 730",
    phoneRam: "6GB / 8GB",
    phoneDisplay: "Super AMOLED Plus",
    phoneOs: "Android 13",
    phoneDisk: "UFS 2.1 128GB",
    phoneCam: "32 MP (f/2.2)",
    phonePin: "4500mAh (25W fast charging)",
  };

  const LaptopInfo = ({
    laptopCpu,
    laptopRam,
    laptopGpu,
    laptopDisplay,
    laptopOs,
    laptopDisk,
  }) => (
    <ul className="list-disc text-sm ml-6">
      <li>CPU: {laptopCpu}</li>
      <li>GPU: {laptopGpu}</li>
      <li>RAM: {laptopRam}</li>
      <li>Disk: {laptopDisk}</li>
      <li>Display: {laptopDisplay}</li>
      <li>OS: {laptopOs}</li>
    </ul>
  );

  const PhoneInfo = ({
    phoneCpu,
    phoneRam,
    phoneDisplay,
    phoneOs,
    phoneDisk,
    phoneCam,
    phonePin,
  }) => (
    <ul className="list-disc text-sm ml-6">
      <li>Samsung Galaxy A71</li>
      <li>CPU: {phoneCpu}</li>
      <li>RAM: {phoneRam}</li>
      <li>Storage: {phoneDisk}</li>
      <li>Display: {phoneDisplay}</li>
      <li>OS: {phoneOs}</li>
      <li>Camera: {phoneCam}</li>
      <li>Battery & Charging: {phonePin}</li>
    </ul>
  );

  return (
    <div className="font-bold text-neutral-800 w-full pb-4">
      <div className="mb-3 flex text-3xl gap-2 font-bold">
        <div className="bg-neutral-800 h-[36px] w-2"></div>
        <h2>Specs 💼</h2>
      </div>

      <p>
        Devices I currently use for gaming, programming, studying, and daily
        activities 💻.
      </p>

      <div className="w-full mt-4 grid md:grid-cols-2 grid-cols-1 gap-5">
        <div>
          <div className="mb-4 p-2 rounded-xl bg-slate-100">
            <h4 className="mb-1 text-2xl font-bold">
              PC{" "}
              <span className="text-xl ml-2 inline-block">
                (custom-built desktop)
              </span>
            </h4>
            <LaptopInfo {...laptopSpecs} />
          </div>

          <div className="p-2 rounded-xl bg-slate-100">
            <h4 className="mb-1 text-2xl font-bold">Phone</h4>
            <PhoneInfo {...phoneSpecs} />
          </div>
        </div>

        <div>
          <div className="mb-4 p-2 rounded-xl bg-slate-100">
            <h4 className="mb-1 text-2xl font-bold">Network</h4>
            <ul className="list-disc text-sm ml-6">
              <li>4G Network: Viettel (ST90N)</li>
              <li>Download speed: 50MB/s</li>
              <li>Upload speed: 2MB/s</li>
            </ul>
          </div>

          <div className="p-2 rounded-xl bg-slate-100">
            <h4 className="mb-1 text-2xl font-bold">Other Devices</h4>
            <ul className="list-disc text-sm ml-6">
              <li>Mouse: Razer DeathAdder V2 HyperSpeed</li>
              <li>Monitor: Full HD Gaming Monitor 100Hz</li>
              <li>Keyboard: Aula F75 (navy blue)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="my-6 border-dashed border-8 border-cyan-500 rounded-3xl overflow-hidden w-11/12 rotate-[355deg] mx-auto">
        <img src={desktop} alt="desktop.jpg" />
      </div>
    </div>
  );
}

export default Specs;
