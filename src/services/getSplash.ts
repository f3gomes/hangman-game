export const handleGetSplash = async (
  championName: string,
  setSplashImg: (img: string) => void
) => {
  let name = championName.charAt(0).toUpperCase() + championName.slice(1);
  try {
    fetch(
      `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`
    )
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
