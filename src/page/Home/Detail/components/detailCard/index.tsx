import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../../recoil";

import { getFormattedDate } from "../../../../../components/api/getFormattedDate";
import { AvatarColor } from "../../../../../constants";
import { GetRevGeocode } from "../../../Map/api/getRevGeocode";

import { MoreOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { LoadingBox2 } from "../../../../../components/LoadingContainer";
import Avatar from "boring-avatars";
import { Dialog } from "../dialog";

export const DetailCard = (item: any) => {
  const { data: geoData, isSuccess: geoSuccess } = useQuery(
    "getRevGeo",
    () =>
      item &&
      GetRevGeocode({ lat: item.data.latitude, lng: item.data.longitude }),
    {
      retry: 1,
    }
  );
  const time = getFormattedDate(new Date(item.data.created_time));
  const [dialogOpen, setDialogOpen] = useRecoilState(recoil_.detailDialogState);

  return (
    <>
      {geoSuccess ? (
        <>
          <div className="postContainer" onClick={(e) => e.stopPropagation()}>
            <div
              className="background"
              style={{ background: `url(${item.data.image[0].img_url})` }}
            ></div>
            <div className="content">
              <div className="header">
                <div className="title">
                  <Avatar
                    size={32}
                    variant="beam"
                    name={item.data.post_id}
                    colors={AvatarColor}
                  />
                  username
                </div>
                <div
                  className="HederAction"
                  onClick={() => setDialogOpen(true)}
                >
                  <MoreOutlined />
                </div>
              </div>
              {item.data.content}
              <div className="PostInfo">
                <div className="date">{time}</div>
                <div className="location">
                  <EnvironmentOutlined /> {geoData}
                </div>
              </div>
            </div>

            <div className="actionSpace">
              <div className="emotions">
                <div className="emotionButton">
                  🥰<div className="emotionCount">{item.data.like_count}</div>
                </div>
                <div className="divider"></div>
                <div className="emotionButton">
                  😎<div className="emotionCount">{item.data.cool_count}</div>
                </div>
                <div className="divider"></div>
                <div className="emotionButton">
                  😢<div className="emotionCount">{item.data.sad_count}</div>
                </div>
              </div>
            </div>
          </div>
          {dialogOpen && <Dialog />}
        </>
      ) : (
        <LoadingBox2 />
      )}
    </>
  );
};
