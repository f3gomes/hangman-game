export const handleGetSplash = async (
  championName: string,
  setSplashImg: (img: string) => void
) => {
  let name = championName.charAt(0).toUpperCase() + championName.slice(1);

  if (name === "Wukong") {
    name = "MonkeyKing";
  }

  if (name === "Bardo") {
    name = "Bard";
  }

  if (name === "RenataGlasc") {
    name = "Renata";
  }

  try {
    fetch(`https://gilthedo.sirv.com/Splash/${name}_0.jpg`)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        let img = URL.createObjectURL(blob);
        setSplashImg(img);
      });
  } catch (err) {
    console.log(err);
  }
};
