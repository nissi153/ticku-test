// NewsPage.jsx
import React from "react";
import styled from "styled-components";

import NewsCard from "../../components/common/NewsCard";
import VolumeInfo from "../../components/information/VolumeInfo";

const NewsContainer = styled.div``;

function NewsPage({ newsData }) {
  const safeNewsData = newsData || [];

  return (
    <div>
      <VolumeInfo title="뉴스" />
      <NewsContainer>
        {safeNewsData.length > 0 ? (
          safeNewsData.map(
            (
              item // map함수에 key 추가
            ) => (
              <NewsCard
                key={item.link} // link를 고유한 key로 사용.  API에서 제공하는 고유 ID가 있다면 그것을 사용하는 것이 더 좋음.
                title={item.title}
                link={item.link}
                pubDate={item.pubDate}
                sourceName={item.sourceName}
              />
            )
          )
        ) : (
          <p>뉴스를 불러오는 중...</p>
        )}
      </NewsContainer>
    </div>
  );
}

export default NewsPage;
