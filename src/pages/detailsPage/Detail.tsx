import React, { useEffect, useState } from 'react';
import { DetailContent, DetailCard, DetailRow, DetailLabel, DetailTitle } from './Detail.styles';
import { useSelectedComponent } from '../../store/useSelectedComponentStore';
import { Divider } from 'antd';
import { DangerIcon } from '../../media/danger';
import { OperatingIcon } from '../../media/operating';

const DetailPage = () => {
  const { selectedComponent } = useSelectedComponent((state) => state);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    setImageUrl(null);
  }, [selectedComponent]);

  if (!selectedComponent) {
    return (
      <DetailContent>
        <p>Select a component to see details</p>
      </DetailContent>
    );
  }

  const SensorContainer = ({ sensorType }: { sensorType: string }) => {
    const label = sensorType === 'energy' ? 'Elétrica' : 'Mecânica';
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#2188FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
            }}>
                {label.charAt(0)}
            </div>
            {label}
      </div>
    );
  }

  const handleSelectImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        setImageUrl(URL.createObjectURL(file));
      }
    };
    input.click();
  };


  return (
    <DetailContent>
        <DetailTitle>{selectedComponent.name} {selectedComponent.status === 'alert' ? <DangerIcon /> : <OperatingIcon />}</DetailTitle>
      <DetailCard>

        {/* Left side: Image placeholder */}
      {imageUrl ? (
      <img
        src={imageUrl}
        alt="Ativo"
        style={{ width: 200, height: 200, objectFit: "cover", cursor: "pointer" }}
        onClick={handleSelectImage}
      />
      ) : (
    <div
      className="image-placeholder"
      style={{
        width: 200,
        height: 200,
        border: "2px dashed #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={handleSelectImage}
    >
      Adicionar imagem do Ativo
    </div>
      )}

        {/* Right side: Details */}
        <div className="detail-info">
          <DetailRow>
            <p style={{ fontSize: '16px', fontWeight: 600, margin: '0px' }}>Tipo de Equipamento</p>
            <p style={{ fontSize: '16px', fontWeight: 400, color: '#88929C', margin: '0px' }}>{selectedComponent.sensorType === 'vibration' ? 'Maquinário' : 'Sistema'}</p>
          </DetailRow>
            <Divider style={{ margin: '0px' }}/>
          <DetailRow>
            <p style={{ fontSize: '16px', fontWeight: 600, margin: '0px' }}>Responsáveis</p>
                <SensorContainer sensorType={selectedComponent.sensorType ?? ''} />
          </DetailRow>

        </div>
      </DetailCard>
      <div style={{ padding: '0px 24px' }}>
        <Divider style={{ margin: '0' }}/>
      </div>

        <div style={{ display: 'flex', flexDirection: 'row', padding: '0 24px' }}>
          <DetailRow>
            <p style={{ fontSize: '16px', fontWeight: 600, margin: '0px' }}>Sensor</p>
            <DetailLabel>{selectedComponent.sensorId || '—'}</DetailLabel>
          </DetailRow>

          <DetailRow style={{ margin: 'auto' }}>
            <p style={{ fontSize: '16px', fontWeight: 600, margin: '0px' }}>Receptor</p>
            <DetailLabel>{selectedComponent.gatewayId || '—'}</DetailLabel>
          </DetailRow>  
        </div>
        

    </DetailContent>
  );
};

export default DetailPage;

