import { useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Vector2 } from 'three';

export const usePostProcess = (strength = 0, radius = 0, threshold = 0) => {
  const { scene, camera, gl, size } = useThree();

  const composer = useMemo(() => {
    const composer = new EffectComposer(gl);
    composer.setSize(size.width, size.height);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new Vector2(size.width, size.height),
      strength,    // strength
      radius,    // radius
      threshold    // threshold
    );

    composer.addPass(bloomPass);

    return composer;
  }, [scene, camera, gl, size, strength, radius, threshold]);

  useFrame(() => {
    composer.render();
  }, 1);

  return null;
};

export default usePostProcess;
